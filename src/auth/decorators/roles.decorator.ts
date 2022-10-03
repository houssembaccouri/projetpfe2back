import { SetMetadata } from '@nestjs/common';
import { Role} from '../models/role.enum'

export const ROLES_Key = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_Key, roles);
