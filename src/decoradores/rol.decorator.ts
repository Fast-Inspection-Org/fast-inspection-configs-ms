import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Forma de crear un decorados personalizado
export const Roles = (roles: Array<String>) => SetMetadata("roles", roles);