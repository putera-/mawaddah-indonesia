import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Prisma } from '@prisma/client';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}
  @Post()
  create(@Body(new ValidationPipe()) data: CreateFaqDto) {
    try {
      console.log('hello from create')
      console.log(data)
      return this.faqsService.create(data as Prisma.FAQCreateInput);
      
    } catch (error) {
      throw error;
    }
  };
  
  @Get()
  findAll() {
    try {
      return this.faqsService.findAll();
      
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.faqsService.findOne(id);
      
    } catch (error) {
      throw error;
      
    }
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    try {
      return this.faqsService.update(id, updateFaqDto);
      
    } catch (error) {
      throw error;
      
    }
  }

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