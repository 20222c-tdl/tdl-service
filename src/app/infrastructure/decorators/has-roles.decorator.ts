import { SetMetadata } from '@nestjs/common';
import { Role } from '../../domain/entities/roles/role.enum';


export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
