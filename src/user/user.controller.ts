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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body(new ValidationPipe()) data: CreateUserDto) {
        try {
            await this.userService.validateNewUser(data);
            return this.userService.create(data);
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
