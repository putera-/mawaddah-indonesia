import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
    create(@Body(new ValidationPipe())  data: CreateBlogDto) {
    console.log(data)
    return this.blogsService.create(data as Prisma.blogCreateInput);
  }

  @Get()
  findAll() {
    try {
      return this.blogsService.findAll();
      
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
   findOne(@Param('id') id: string) {
    try {
      return this.blogsService.findOne(id);
      
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateBlogDto: UpdateBlogDto) {
    try {
      return this.blogsService.update(id, updateBlogDto);
      
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    try {
      return this.blogsService.remove(id);
      
    } catch (error) {
      throw error;
    }
  }
}
