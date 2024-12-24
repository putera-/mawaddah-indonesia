import {
    Controller,
    Get,
    Post,
    Param,
    Request,
    HttpCode,
    Patch,
    Query,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CheckBookmarkDoc,
    CreateBookmarkDoc,
    GetAllBookmarkDoc,
    GetBookmarkByIdDoc,
    RemoveBookmarkDoc,
} from './bookmark.doc';

@ApiTags('Bookmark')
@ApiBearerAuth()
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @CreateBookmarkDoc()
    @Roles(Role.Member)
    @Post(':id')
    create(@Request() req: any, @Param('id') id: string) {
        try {
            const userId = req.user.id;

            return this.bookmarkService.create(userId, id);
        } catch (error) {
            throw error;
        }
    }

    @GetAllBookmarkDoc()
    @Roles(Role.Member)
    @Get()
    findAll(
        @Request() req: any,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        try {
            const id = req.user.id;
            return this.bookmarkService.findAll(id, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @GetBookmarkByIdDoc()
    @Roles(Role.Member)
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.bookmarkService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @CheckBookmarkDoc()
    @Roles(Role.Member)
    @Get('check/:id')
    isBookmarked(
        @Request() req: any,
        @Param('id') idCandidate: string,
    ): Promise<boolean> {
        try {
            const idUser = req.user.id;
            return this.bookmarkService.isBookmarked(idUser, idCandidate);
        } catch (error) {
            throw error;
        }
    }

    @RemoveBookmarkDoc()
    @Roles(Role.Member)
    @Patch(':id')
    @HttpCode(204)
    remove(@Param('id') candidateId: string, @Request() req: any) {
        try {
            return this.bookmarkService.update(candidateId, req.user.id);
        } catch (error) {
            throw error;
        }
    }
}
