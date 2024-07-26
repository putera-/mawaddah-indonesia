import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Req,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Roles(Role.Admin, Role.Superadmin)
    @Post()
    create(@Req() req, @Body() data: CreateQuestionDto) {
        try {
            return this.questionService.create(req.user.id, data);
        } catch (error) {
            throw error;
        }
    }

    @Get()
    findAll() {
        return this.questionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.questionService.findOne(+id);
    }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    //     return this.questionService.update(+id, updateQuestionDto);
    //   }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.questionService.remove(+id);
    }
}
