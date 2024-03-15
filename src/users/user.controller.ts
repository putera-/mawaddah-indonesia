import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        try {
            await this.userService.validateNewUser(data);

            const user: User = await this.userService.create(data);

            // FORMAT/HIDE USER DATA
            this.userService.formatGray(user);

            return user;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    findAll() {
        try {
            return this.userService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.userService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        try {
            return this.userService.update(id, data as Prisma.UserUpdateInput);
        } catch (error) {
            throw error;
        }
    }

    @Patch('activate/:id')
    @HttpCode(204)
    async activateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.activateUser(id);
        } catch (error) {
            throw error;
        }
    }
    @Patch('deactivate/:id')
    @HttpCode(204)
    async deactivateUser(@Param('id') id: string): Promise<void> {
        try {
            await this.userService.deactivateUser(id);
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.userService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
