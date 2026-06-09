import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from '../database/models/role.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async findAll() {
    return this.roleModel.findAll({
      order: [['name', 'ASC']],
    });
  }
}