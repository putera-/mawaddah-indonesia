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
} from '@nestjs/common';
import { CreateUserSuperadminDto } from './dto/create-user-superadmin.dto';
import { Public } from 'src/auth/auth.metadata';
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('user-superadmin')
export class UserSuperadminController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
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
            return this.usersService.create(data);
        } catch (error) {
            throw error;
        }
    }
    // create superuser by superuser
    @Roles(Role.Superadmin)
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserSuperadminDto) {
        try {
            // validate new user
            await this.usersService.validateNewUser(data);

            // set as superadmin
            data.role = 'SUPERADMIN';
            return this.usersService.create(data);
        } catch (error) {
            throw error;
        }
    }

    // get superuser by super user
    @Roles(Role.Superadmin)
    @Get()
    findAll() {
        try {
            return this.usersService.findAll('SUPERADMIN');
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id, 'SUPERADMIN');
    }

    // @Patch()
    // use global self user upate

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
