import { Controller, Get, Body, Patch, Req, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Answer, Prisma } from '@prisma/client';
import { Question } from 'src/question/question.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllAnswerDoc, GetAnswerDoc, PatchAnswerDoc } from './answer.doc';

@ApiTags('Answer')
@ApiBearerAuth()
@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @GetAllAnswerDoc()
    @Roles(Role.Member)
    @Get()
    async findAll(@Req() req: any): Promise<Question[]> {
        try {
            return await this.answerService.findAll(req.user.id);
        } catch (error) {
            throw error;
        }
    }

    @GetAnswerDoc()
    @Roles(Role.Member)
    @Get('by-question')
    async findOne(
        @Query('question-id') questionId: string,
        @Req() req: any,
    ): Promise<Question> {
        try {
            return await this.answerService.findOne(req.user.id, questionId);
        } catch (error) {
            throw error;
        }
    }

    @PatchAnswerDoc()
    @Roles(Role.Member)
    @Patch('by-question')
    async update(
        @Req() req: any,
        @Query('question-id') questionId: string,
        @Body() data: UpdateAnswerDto,
    ) {
        try {
            return await this.answerService.update(
                req.user.id,
                questionId,
                data as Prisma.AnswerCreateInput,
            );
        } catch (error) {
            throw error;
        }
    }
}
