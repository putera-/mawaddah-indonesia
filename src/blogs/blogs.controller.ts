import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { Public } from 'src/auth/auth.metadata';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    create(@Body() createBlogDto: CreateBlogDto) {
        try {
            return this.blogsService.create(createBlogDto);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            return this.blogsService.findAll(page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.blogsService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        try {
            return this.blogsService.update(id, updateBlogDto);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            return this.blogsService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
