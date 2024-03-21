import {
    Controller,
    Get,
    Post,
    Param,
    Request,
    HttpCode,
    Patch,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}
    @Roles(Role.Member)
    @Post(':id')
    create(@Request() req: any, @Param('id') id: string) {
        const userId = req.user.id;

        return this.bookmarkService.create(userId, id);
    }

    @Roles(Role.Member)
    @Get()
    findAll(@Request() req: any) {
        const id = req.user.id;
        return this.bookmarkService.findAll(id);
    }

    @Roles(Role.Member)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookmarkService.findOne(id);
    }

    @Roles(Role.Member)
    @Patch(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.bookmarkService.remove(id);
    }
}
