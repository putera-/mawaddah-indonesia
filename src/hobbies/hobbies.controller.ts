import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    Request,
    NotFoundException,
    HttpCode,
    Query,
} from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('hobbies')
export class HobbiesController {
    constructor(private readonly hobbiesService: HobbiesService) {}

    @Roles(Role.Member)
    @Post()
    create(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateHobbyDto,
    ) {
        try {
            const userId = req.user.id;
            return this.hobbiesService.create(userId, data);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get()
    findAll(
        @Request() req: any,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        try {
            const userId = req.user.id;
            return this.hobbiesService.findAll(userId, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        try {
            const userId = req.user.id;
            return this.hobbiesService.findOne(userId, id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch(':id')
    update(
        @Request() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: UpdateHobbyDto,
    ) {
        try {
            const userId = req.user.id;
            return this.hobbiesService.update(userId, id, data);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @HttpCode(204)
    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        try {
            if (!id) throw new NotFoundException('Id not found');
            const userId = req.user.id;
            return this.hobbiesService.remove(userId, id);
        } catch (error) {
            throw error;
        }
    }
}
