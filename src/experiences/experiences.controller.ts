import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ValidationPipe, Query, HttpCode, NotFoundException } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma } from '@prisma/client';
import { BiodataService } from 'src/biodata/biodata.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDoc, DeleteExperienceById, GetExperiemceAll, GetExperiemceById, UpdateExperienceById } from './experience.doc';

@ApiTags('experiences')
@ApiBearerAuth()
@Controller('experiences')
export class ExperiencesController {
    constructor(private readonly experienceService: ExperiencesService,
        private readonly biodataService: BiodataService
    ) { }

    @CreateExperienceDoc()
    @Roles(Role.Member)
    @Post()
    async create(@Request() req: any, @Body(new ValidationPipe()) data: CreateExperienceDto) {
        const userId = req.user.id
        try {

            const biodata = await this.biodataService.findMe(userId)
            const experience: Prisma.ExperienceCreateInput = {
                ...data,
                biodata: {
                    connect: { id: biodata.id }
                }
            }

            console.log(experience)
            return this.experienceService.create(experience);

        } catch (error) {
            throw error;
        }
    }

    @GetExperiemceAll()
    @Roles(Role.Member)
    @Get()
    async findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            if (!biodata) throw new NotFoundException('Biodata not found');

            return this.experienceService.findAll(biodata.id, page, limit);

        } catch (error) {
            throw error;
        }
    }


    @Roles(Role.Member)
    @GetExperiemceById()
    @Get(':id')
    async findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            if (!biodata) throw new NotFoundException('Biodata not found');

            return this.experienceService.findOne(biodata.id, id);

        } catch (error) {
            throw error;

        }
    }

    @UpdateExperienceById()
    @Roles(Role.Member)
    @Patch(':id')
    async update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateExperienceDto) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            if (!biodata) throw new NotFoundException('Biodata not found');

            return this.experienceService.update(biodata.id, id, data);

        } catch (error) {
            throw error;

        }
    }

    @DeleteExperienceById()
    @Roles(Role.Member)
    @HttpCode(204)
    @Delete(':id')
    async remove(@Request() req: any, @Param('id') id: string) {
        try {
            const userId = req.user.id

            const biodata = await this.biodataService.findMe(userId)

            if (!biodata) throw new NotFoundException('Biodata not found');

            if (!id) throw new NotFoundException('Id not found');
            return this.experienceService.remove(biodata.id, id);

        } catch (error) {
            throw error;

        }
    }
}
