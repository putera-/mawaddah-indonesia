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

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get()
    async findAll(@Request() req: any, @Query() query: Record<string, any>) {
        try {
            const role = req.user.role;
            return await this.userService.findAll(role, query);
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

    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        try {
            return this.userService.update(id, data as Prisma.UserUpdateInput);
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Admin, Role.Superadmin)
    @Patch('activate/:id')
    @HttpCode(204)
    async activateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.activateUser(id);
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
