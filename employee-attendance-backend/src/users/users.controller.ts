import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { RolesGuard } from '../common/guards/roles.guard';
import { SessionGuard } from '../common/guards/session.guard';

// import { Roles } from '../common/decorators/roles.decorator';
// import { RoleEnum } from '../common/enums/role.enum';

import { AssignManagerDto } from './dto/assign-manager.dto';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Req } from '@nestjs/common';

import {
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import {
  diskStorage,
} from 'multer';

import { extname } from 'path';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(
  JwtAuthGuard,
  SessionGuard,
  PermissionsGuard,
)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('me/test')
  test(@Req() req) {
    return req.user;
  }

  @Post()
  @Permissions('USER_CREATE')
  @ApiOperation({
    summary: 'Create User',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(
      createUserDto,
    );
  }

  @Get()
  @Permissions('USER_VIEW')
  @ApiOperation({
    summary: 'Get All Users',
  })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('directory')
  @Permissions('USER_VIEW')
  @ApiOperation({
    summary:
      'Employee Directory (Admin + HR)',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns all employees with role and manager information',
  })
  async getEmployeeDirectory() {
    return this.usersService.findAll();
  }

    @Get('me')
async getMyProfile(
  @Req() req,
) {
  return this.usersService.getMyProfile(
    req.user.id,
  );
}

@Patch('me')
async updateMyProfile(
  @Req() req,
  @Body() dto: UpdateUserDto,
) {
  return this.usersService.updateMyProfile(
    req.user.id,
    dto,
  );
}

@Patch('me/profile-picture')
@UseInterceptors(
  FileInterceptor(
    'profilePicture',
    {
      storage: diskStorage({
        destination:
          './uploads/profile',

        filename:
          (
            req,
            file,
            cb,
          ) => {
            const uniqueName =
              Date.now() +
              '-' +
              Math.round(
                Math.random() *
                  1000000,
              ) +
              extname(
                file.originalname,
              );

            cb(
              null,
              uniqueName,
            );
          },
      }),
    },
  ),
)
async uploadProfilePicture(
  @Req() req,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.usersService.saveProfilePicture(
    req.user.id,
    file.filename,
  );
}

  @Get(':id')
  @Permissions('USER_VIEW')
  @ApiOperation({
    summary: 'Get User By ID',
  })
  async getUserById(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Permissions('USER_UPDATE')
  @ApiOperation({
    summary: 'Update User',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(
      id,
      updateUserDto,
    );
  }

  @Delete(':id')
  @Permissions('USER_DELETE')
  @ApiOperation({
    summary: 'Delete User',
  })
  async deleteUser(
    @Param('id') id: string,
  ) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id/assign-manager')
  @Permissions('USER_UPDATE')
  @ApiOperation({
    summary:
      'Assign Employee To Manager',
  })
  async assignManager(
    @Param('id') employeeId: string,
    @Body() dto: AssignManagerDto,
  ) {
    return this.usersService.assignManager(
      employeeId,
      dto.managerId,
    );
  }

  @Patch(':id/remove-manager')
  @Permissions('USER_UPDATE')
  @ApiOperation({
    summary:
      'Remove Employee Manager',
  })
  async removeManager(
    @Param('id') employeeId: string,
  ) {
    return this.usersService.removeManager(
      employeeId,
    );
  }

  @Get('team/:managerId')
  @Permissions('USER_VIEW')
  @ApiOperation({
    summary:
      'Get Manager Team Members',
  })
  async getTeamMembers(
    @Param('managerId')
    managerId: string,
  ) {
    return this.usersService.getTeamMembers(
      managerId,
    );
  }




}