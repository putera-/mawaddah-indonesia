import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Req,
    Patch,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { Prisma } from '@prisma/client';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Roles(Role.Admin, Role.Superadmin)
    @Post()
    create(@Req() req, @Body() data: CreateQuestionDto) {
        try {
            return this.questionService.create(
                req.user.id,
                data as Prisma.QuestionCreateInput,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Admin, Role.Superadmin)
    @Get()
    async findAll() {
        return await this.questionService.findAll();
    }

    @Roles(Role.Admin, Role.Superadmin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.questionService.findOne(id);
    }

    @Roles(Role.Admin, Role.Superadmin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: CreateQuestionDto) {
        return await this.questionService.update(
            id,
            data as Prisma.QuestionUpdateInput,
        );
    }

    @Roles(Role.Admin, Role.Superadmin)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.questionService.remove(id);
    }
}
