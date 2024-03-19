import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    HttpCode,
} from '@nestjs/common';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('user-admin')
export class UserAdminController {
    constructor(private readonly usersService: UsersService) {}

    // create admin by superuser
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserAdminDto) {
        try {
            // validate new user
            await this.usersService.validateNewUser(data);

            // set as superadmin
            data.role = 'ADMIN';
            return this.usersService.create(data);
        } catch (error) {
            throw error;
        }
    }

    // get all admin by super user
    @Roles(Role.Superadmin, Role.Admin)
    @Get()
    findAll() {
        try {
            return this.usersService.findAll('ADMIN');
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Superadmin, Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id, 'ADMIN');
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateUserAdminDto: UpdateUserAdminDto,
    // ) {
    //     return this.userAdminService.update(+id, updateUserAdminDto);
    // }

    @Roles(Role.Superadmin, Role.Admin)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.usersService.remove(id, 'ADMIN');
        } catch (error) {
            throw error;
        }
    }
}
