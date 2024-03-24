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
    HttpCode,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) {}

    @Roles(Role.Member)
    @Post()
    create(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateSkillDto,
    ) {
        const userId = req.user.id;
        try {
            return this.skillsService.create(userId, data);
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
        const userId = req.user.id;
        try {
            return this.skillsService.findAll(userId, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;
        try {
            return this.skillsService.findOne(userId, id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch(':id')
    update(
        @Request() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: UpdateSkillDto,
    ) {
        const userId = req.user.id;
        try {
            return this.skillsService.update(userId, id, data);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @HttpCode(204)
    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        try {
            const userId = req.user.id;
            if (!id) throw new NotFoundException('Id not found');
            return this.skillsService.remove(userId, id);
        } catch (error) {
            throw error;
        }
    }
}
