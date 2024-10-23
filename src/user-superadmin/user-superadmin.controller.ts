import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ForbiddenException,
    HttpCode,
    Request,
    Query,
} from '@nestjs/common';
import { CreateUserSuperadminDto } from './dto/create-user-superadmin.dto';
import { Public } from 'src/auth/auth.metadata';
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma, RoleStatus } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateFirstSuperAdminDoc,
    CreateSuperAdminDoc,
    DeleteSuperAdminDoc,
    GetAllSuperAdminDoc,
    GetSuperAdminByIdDoc,
} from './user-superadmin.doc';

@ApiTags('User Super Admin')
@Controller('user-superadmin')
export class UserSuperadminController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @CreateFirstSuperAdminDoc()
    @Post('first')
    async createFirst(
        @Body(new ValidationPipe()) data: CreateUserSuperadminDto,
    ) {
        try {
            // check is super user already exist
            const supers = await this.usersService.findSuperUser();
            if (supers.length) throw new ForbiddenException('Cannot access');

            // validate new user
            await this.usersService.validateNewUser(data);

            // set as superadmin
            data.role = 'SUPERADMIN';

            const dataUser: Prisma.UserCreateInput = {
                ...data,
                password: {
                    create: {
                        password: data.password,
                    },
                },
            };
            return this.usersService.create(dataUser);
        } catch (error) {
            throw error;
        }
    }

    // create superuser by superuser
    @CreateSuperAdminDoc()
    @Roles(Role.Superadmin)
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserSuperadminDto) {
        try {
            // validate new user
            await this.usersService.validateNewUser(data);

            // set as superadmin
            data.role = 'SUPERADMIN';

            const dataUser: Prisma.UserCreateInput = {
                ...data,
                password: {
                    create: {
                        password: data.password,
                    },
                },
            };
            return this.usersService.create(dataUser);
        } catch (error) {
            throw error;
        }
    }

    // get superuser by super user
    @GetAllSuperAdminDoc()
    @Roles(Role.Superadmin)
    @Get()
    findAll(
        @Request() req: any,
        @Query('limit') limit: number,
        @Query('page') page: number,
    ) {
        try {
            const roles: RoleStatus[] = ['SUPERADMIN'];
            limit = limit ? +limit : 10;
            page = page ? +page : 10;

            return this.usersService.findAll(roles, limit);
        } catch (error) {
            throw error;
        }
    }

    @GetSuperAdminByIdDoc()
    @Roles(Role.Superadmin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id, 'SUPERADMIN');
    }

    // @Patch()
    // use global self user upate

    @DeleteSuperAdminDoc()
    @Roles(Role.Superadmin)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.usersService.remove(id, 'SUPERADMIN');
        } catch (error) {
            throw error;
        }
    }
}
