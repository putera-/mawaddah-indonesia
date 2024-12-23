import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { CreateFaqDoc, DeleteFaqById, GetFaqAll, GetFaqById, UpdateFaqById } from './faq.doc';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('faqs')
@Controller('faqs')
export class FaqsController {
    constructor(private readonly faqsService: FaqsService) { }
    @CreateFaqDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    create(@Body(new ValidationPipe()) data: CreateFaqDto) {
        try {
            return this.faqsService.create(data as Prisma.FAQCreateInput);
        } catch (error) {
            throw error;
        }
    };

    @GetFaqAll()
    @Roles(Role.Member, Role.Superadmin, Role.Admin)
    @Get()
    findAll() {
        try {
            return this.faqsService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @GetFaqById()
    @Roles(Role.Member, Role.Superadmin, Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.faqsService.findOne(id);
        } catch (error) {
            throw error;
        }
    }


    @UpdateFaqById()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
        try {
            return this.faqsService.update(id, updateFaqDto);
        } catch (error) {
            throw error;
        }
    }

    @DeleteFaqById()
    @Roles(Role.Superadmin, Role.Admin)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        try {
            return this.faqsService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
