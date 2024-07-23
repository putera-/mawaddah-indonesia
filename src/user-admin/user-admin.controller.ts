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
    Request,
    Query,
} from '@nestjs/common';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma, RoleStatus } from '@prisma/client';

@Controller('user-admin')
export class UserAdminController {
    constructor(private readonly usersService: UsersService) { }

    // create admin by superuser
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserAdminDto) {
        try {
            // validate new user
            await this.usersService.validateNewUser(data);

            // set as superadmin
            data.role = 'ADMIN';
            const dataUser: Prisma.UserCreateInput = {
                ...data,
                password: {
                    create: {
                        password: data.password
                    }
                }
            }
            return this.usersService.create(dataUser);
        } catch (error) {
            throw error;
        }
    }

    // get all admin by super user
    @Roles(Role.Superadmin, Role.Admin)
    @Get()
    findAll(@Request() req: any, @Query('limit') limit: number, @Query('page') page: number) {
        try {
            // const roles: RoleStatus[] = req.user.role;
            // // const'
            const roles: RoleStatus[] = ['ADMIN'];
            limit = limit ? +limit : 10;
            page = page ? +page : 10;

            return this.usersService.findAll(roles, limit);
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
