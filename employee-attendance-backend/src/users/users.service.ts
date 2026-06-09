import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { User } from '../database/models/user.model';
import { Role } from '../database/models/role.model';

import { Session } from '../database/models/session.model';
import { Attendance } from '../database/models/attendance.model';
import { LeaveRequest } from '../database/models/leave-request.model';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { MailService } from '../mail/mail.service';
import { LeaveBalance } from '../database/models/leave-balance.model';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(Role)
    private readonly roleModel: typeof Role,

    @InjectModel(Session)
    private readonly sessionModel: typeof Session,

    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,

    @InjectModel(LeaveRequest)
    private readonly leaveModel: typeof LeaveRequest,

    @InjectModel(LeaveBalance)
    private readonly leaveBalanceModel: typeof LeaveBalance,

    private readonly mailService: MailService,
  ) { }

  async createUser(
    createUserDto: CreateUserDto,
  ) {
    const existingUsername =
      await this.userModel.findOne({
        where: {
          username:
            createUserDto.username,
        },
      });

    if (existingUsername) {
      throw new BadRequestException(
        'Username already exists',
      );
    }

    const existingEmail =
      await this.userModel.findOne({
        where: {
          email: createUserDto.email,
        },
      });

    if (existingEmail) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const role =
      await this.roleModel.findByPk(
        createUserDto.roleId,
      );

    if (!role) {
      throw new BadRequestException(
        'Invalid role',
      );
    }

    if (createUserDto.managerId) {
      const manager =
        await this.userModel.findByPk(
          createUserDto.managerId,
        );

      if (!manager) {
        throw new BadRequestException(
          'Manager not found',
        );
      }
    }

    const hashedPassword =
      await bcrypt.hash(
        createUserDto.password,
        10,
      );

    const user =
      await this.userModel.create({
        firstName:
          createUserDto.firstName,

        lastName:
          createUserDto.lastName,

        username:
          createUserDto.username,

        email: createUserDto.email,

        passwordHash:
          hashedPassword,

        roleId:
          createUserDto.roleId,

        managerId:
          createUserDto.managerId,

        isActive: true,
      } as any);

    await this.leaveBalanceModel.create({
      userId: user.id,
      sickLeave: 12,
      casualLeave: 12,
      earnedLeave: 12,
    } as any);

    return {
      message:
        'User created successfully',
      user,
    };
  }



  async findAll() {
    return this.userModel.findAll({
      attributes: {
        exclude: ['passwordHash'],
      },
      include: [
        Role,
        {
          model: User,
          as: 'manager',
          attributes: [
            'id',
            'firstName',
            'lastName',
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    const user =
      await this.userModel.findByPk(id, {
        attributes: {
          exclude: ['passwordHash'],
        },
        include: [Role],
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const user =
      await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const updateData: any = {
      ...updateUserDto,
    };

    if (updateUserDto.password) {
      const tempPassword =
        updateUserDto.password;

      const hashedPassword =
        await bcrypt.hash(
          tempPassword,
          10,
        );

      updateData.passwordHash =
        hashedPassword;

      delete updateData.password;

      updateData.forcePasswordChange =
        true;

      await this.mailService.sendPasswordResetMail(
        user.email,
        user.username,
        tempPassword,
      );
    }

    await user.update(updateData);

    return {
      message:
        'User updated successfully',
    };
  }

  async deleteUser(id: string) {
    try {
      const user =
        await this.userModel.findByPk(id);

      if (!user) {
        throw new NotFoundException(
          'User not found',
        );
      }

      await this.sessionModel.destroy({
        where: {
          userId: id,
        },
      });

      await this.attendanceModel.destroy({
        where: {
          userId: id,
        },
      });

      await this.leaveModel.destroy({
        where: {
          userId: id,
        },
      });

      await this.userModel.update(
        {
          managerId: null,
        },
        {
          where: {
            managerId: id,
          },
        },
      );

      await user.destroy();

      return {
        message:
          'User deleted successfully',
      };
    } catch (error) {
      console.log(
        'DELETE USER ERROR:',
        error,
      );

      throw error;
    }
  }

  async assignManager(
    employeeId: string,
    managerId: string,
  ) {
    const employee =
      await this.userModel.findByPk(
        employeeId,
      );

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    const manager =
      await this.userModel.findByPk(
        managerId,
        {
          include: [Role],
        },
      );

    if (!manager) {
      throw new NotFoundException(
        'Manager not found',
      );
    }

    if (
      manager.role.name !== 'MANAGER'
    ) {
      throw new BadRequestException(
        'Selected user is not a manager',
      );
    }

    await employee.update({
      managerId,
    });

    return {
      message:
        'Manager assigned successfully',
    };
  }

  async removeManager(
    employeeId: string,
  ) {
    const employee =
      await this.userModel.findByPk(
        employeeId,
      );

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    await employee.update({
      managerId: null,
    });

    return {
      message:
        'Manager removed successfully',
    };
  }

  async getTeamMembers(
    managerId: string,
  ) {
    return this.userModel.findAll({
      where: {
        managerId,
      },
      include: [Role],
    });
  }

  async getMyProfile(
    userId: string,
  ) {
    return this.findOne(userId);
  }

  async updateMyProfile(
    userId: string,
    dto: UpdateUserDto,
  ) {
    const user =
      await this.userModel.findByPk(
        userId,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    await user.update({
      firstName:
        dto.firstName ??
        user.firstName,

      lastName:
        dto.lastName ??
        user.lastName,
    });

    return {
      message:
        'Profile updated successfully',
    };
  }

  async saveProfilePicture(
    userId: string,
    filename: string,
  ) {
    const user =
      await this.userModel.findByPk(
        userId,
      );

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const imagePath =
      `/uploads/profile/${filename}`;

    await user.update({
      profilePicture:
        imagePath,
    });

    return {
      message:
        'Profile picture updated',
      profilePicture:
        imagePath,
    };
  }

  async getHrUsers() {
    return this.userModel.findAll({
      include: [
        {
          model: Role,
          where: {
            name: 'HR',
          },
        },
      ],
    });
  }

}