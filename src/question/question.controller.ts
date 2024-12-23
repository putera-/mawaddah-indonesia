import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Req,
    Patch,
    HttpCode,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDoc, DeleteQuestionByIdDoc, GetQuestionAllDoc, GetQuestionByIdDoc, UpdateQuestionByIdDoc} from './question.doc';

@ApiTags('Question')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @CreateQuestionDoc()
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

    @GetQuestionAllDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Get()
    async findAll() {
        try {
            return await this.questionService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @GetQuestionByIdDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.questionService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @UpdateQuestionByIdDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: CreateQuestionDto) {
        try {
            return await this.questionService.update(
                id,
                data as Prisma.QuestionUpdateInput,
            );
        } catch (error) {
            throw error;
        }
    }

    @DeleteQuestionByIdDoc()
    @Roles(Role.Admin, Role.Superadmin)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        try {
            await this.questionService.remove(id);
            return;
        } catch (error) {
            throw error;
        }
    }
}
