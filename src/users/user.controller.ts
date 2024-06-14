import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    Request,
    Query,
    Ip,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, RoleStatus } from '@prisma/client';
import { PhotosService } from 'src/photos/photos.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private photoService: PhotosService,
    ) { }

    @Roles(Role.Superadmin, Role.Admin)
    @Get('members')
    async findAll(@Request() req: any, @Query('limit') limit: number, @Query('page') page: number) {
        try {
            const roles: RoleStatus[] = ['MEMBER'];
            limit = limit ? +limit : 10;
            page = page ? +page : 10;

            return await this.userService.findAll(roles, limit, page);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const user = await this.userService.findOne(id, 'MEMBER');
            this.userService.formatGray(user);
            return user;
        } catch (error) {
            throw error;
        }
    }


    @Roles(Role.Admin, Role.Superadmin)
    @Patch('deactivate/:id')
    @HttpCode(204)
    async deactivateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.deactivateUser(id);
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Admin, Role.Superadmin)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string, role: RoleStatus) {
        try {
            return this.userService.remove(id, role);
        } catch (error) {
            throw error;
        }
    }
}
