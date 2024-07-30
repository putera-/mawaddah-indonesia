import {
    Controller,
    Get,
    Body,
    Patch,
    Req,
    Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Answer, Prisma } from '@prisma/client';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) { }

    @Roles(Role.Member)
    @Get()
    async findAll(@Req() req: any): Promise<Answer[]> {
        try {
            return await this.answerService.findAll(req.user.id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get('by-question')
    async findOne(
        @Query('questionId') questionId: string,
        @Req() req: any,
    ): Promise<Answer> {
        try {
            return await this.answerService.findOne(req.user.id, questionId);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch('by-question')
    async update(
        @Req() req: any,
        @Query('questionId') questionId: string,
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

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.answerService.remove(+id);
    // }
}
