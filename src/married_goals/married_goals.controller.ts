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
    Query,
} from '@nestjs/common';
import { MarriedGoalsService } from './married_goals.service';
import { CreateMarriedGoalDto } from './dto/create-married_goal.dto';
import { UpdateMarriedGoalDto } from './dto/update-married_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('married-goals')
export class MarriedGoalsController {
    constructor(private readonly marriedGoalsService: MarriedGoalsService) {}

    @Roles(Role.Member)
    @Post()
    async create(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateMarriedGoalDto,
    ) {
        const userId = req.user.id;
        try {
            return this.marriedGoalsService.create(userId, data);
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
            return this.marriedGoalsService.findAll(userId, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;
        try {
            return this.marriedGoalsService.findOne(userId, id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch(':id')
    update(
        @Request() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: UpdateMarriedGoalDto,
    ) {
        try {
            const userId = req.user.id;
            // console.log(req.user.id)
            return this.marriedGoalsService.update(userId, id, data);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @HttpCode(204)
    @Delete(':id')
    //TODO NTAR UPDATE INI, SAMA DI SKILLS JUGA
    remove(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;
        try {
            return this.marriedGoalsService.remove(userId, id);
        } catch (error) {
            throw error;
        }
    }
}
