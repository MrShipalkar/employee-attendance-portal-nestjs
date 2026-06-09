import {
    Injectable,
} from '@nestjs/common';

import {
    InjectModel,
} from '@nestjs/sequelize';

import {
    JwtService,
} from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../database/models/user.model';
import { Session } from '../database/models/session.model';
import { Role } from '../database/models/role.model';
import { Permission } from '../database/models/permission.model';

@Injectable()
export class AuthMsService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,

        @InjectModel(Session)
        private readonly sessionModel: typeof Session,

        private readonly jwtService: JwtService,
    ) { }

    async login(
        username: string,
        password: string,
    ) {
        const user =
            await this.userModel.findOne({
                where: {
                    username,
                },

                include: [
                    {
                        model: Role,
                        include: [Permission],
                    },
                ],
            });

        if (!user) {
            return {
                success: false,
                message:
                    'Invalid credentials',
            };
        }

        const isPasswordValid =
            await bcrypt.compare(
                password,
                user.passwordHash,
            );

        if (!isPasswordValid) {
            return {
                success: false,
                message:
                    'Invalid credentials',
            };
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role?.name,
        };

        const accessToken =
            await this.jwtService.signAsync(
                payload,
            );

        await this.sessionModel.create({
            userId: user.id,
            token: accessToken,
            lastActivity: new Date(),
        } as any);
        console.log(
            '🔥 LOGIN HANDLED BY AUTH MICROSERVICE',
        );
        return {
            accessToken,

            forcePasswordChange:
                user.forcePasswordChange,

            user: {
                id: user.id,

                firstName:
                    user.firstName,

                lastName:
                    user.lastName,

                username:
                    user.username,

                email:
                    user.email,

                profilePicture:
                    user.profilePicture,

                role:
                    user.role?.name,

                permissions:
                    user.role?.permissions?.map(
                        permission =>
                            permission.name,
                    ) || [],
            },
        };
    }
}