import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Answer, Prisma } from '@prisma/client';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Roles(Role.Member)
    @Get()
    async findAll(): Promise<Answer[]> {
        return await this.answerService.findAll();
    }

    @Roles(Role.Member)
    @Get('id')
    async findOne(@Param('id') id: string): Promise<Answer> {
        return await this.answerService.findOne(id);
    }

    @Roles(Role.Member)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateAnswerDto) {
        return await this.answerService.update(
            id,
            data as Prisma.AnswerCreateInput,
        );
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.answerService.remove(+id);
    // }
}
