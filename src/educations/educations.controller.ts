import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, ValidationPipe, NotFoundException, Query } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma } from '@prisma/client';
import { CreateEducationDoc, DeleteEducationById, GetEducationAll, GetEducationById, UpdateEducationById } from './education.doc';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Education')
@ApiBearerAuth()
@Controller('educations')
export class EducationsController {
    constructor(private readonly educationsService: EducationsService) { }

    @CreateEducationDoc()
    @Roles(Role.Member)
    @Post()
    create(@Request() req: any, @Body(new ValidationPipe()) data: CreateEducationDto) {
        const userId = req.user.id
        try {
            return this.educationsService.create(userId, data as Prisma.EducationCreateInput);

        } catch (error) {
            throw error;
        }
    }

    @GetEducationAll()
    @Roles(Role.Member)
    @Get()
    findAll(@Request() req: any, @Query('page') page: number, @Query('limit') limit: number) {
        const userId = req.user.id
        try {
            return this.educationsService.findAll(userId, page, limit);

        } catch (error) {
            throw error;
        }
    }


    @GetEducationById()
    @Roles(Role.Member)
    @Get(':id')
    findOne(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id
        try {
            return this.educationsService.findOne(userId, id);

        } catch (error) {
            throw error;

        }
    }

    @UpdateEducationById()
    @Roles(Role.Member)
    @Patch(':id')
    update(@Request() req: any, @Param('id') id: string, @Body(new ValidationPipe()) data: UpdateEducationDto) {
        const userId = req.user.id
        try {
            return this.educationsService.update(userId, id, data);

        } catch (error) {
            throw error;

        }
    }

    @DeleteEducationById()
    @Roles(Role.Member)
    @HttpCode(204)
    @Delete(':id')
    remove(@Request() req: any, @Param('id') id: string) {
        try {
            const userId = req.user.id
            if (!id) throw new NotFoundException('Id not found');
            return this.educationsService.remove(userId, id);

        } catch (error) {
            throw error;

        }
    }
}
