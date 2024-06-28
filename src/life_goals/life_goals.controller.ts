import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { CreateLifeGoalDto } from './dto/create-life_goal.dto';
import { UpdateLifeGoalDto } from './dto/update-life_goal.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { BiodataService } from 'src/biodata/biodata.service';
import { LifeGoalsService } from './life_goals.service';
import { Prisma } from '@prisma/client';

@Controller('life-goals')
export class LifeGoalsController {
    constructor(
        private readonly lifeGoalService: LifeGoalsService,
        private readonly biodataService: BiodataService,
    ) { }

    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            return this.lifeGoalService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateLifeGoalDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            const dataSave: Prisma.LifeGoalCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } }
            }

            return this.lifeGoalService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
