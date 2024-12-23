import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllInboxDoc, GetInboxByIdDoc, markAsFavouriteDoc, markAsUnavouriteDoc, markInboxAsReadDoc } from './inbox.doc';
import { get } from 'http';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';

@ApiBearerAuth()
@ApiTags('Inbox')
@Controller('inbox')
export class InboxController {
    constructor(private readonly inboxService: InboxService) { }

    //   @Post()
    //   create(@Body() createInboxDto: CreateInboxDto) {
    //     return this.inboxService.create(createInboxDto);
    //   }

    @Roles(Role.Member)
    @GetAllInboxDoc()
    @Get()
    findAll(
        @Req() req: any,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        try {
            limit = limit ? +limit : 10;
            page = page ? +page : 1;

            return this.inboxService.findAll(req.user.id, page, limit);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @GetInboxByIdDoc()
    @Get(':id')
    findOne(
        @Param('id') id: string,
    ) {
        try {
            return this.inboxService.findOne(id);
        } catch (error) {
            throw error;
        }
    }


    @Roles(Role.Member)
    @markInboxAsReadDoc()
    @Patch('mark_read/:id')
    markAsRead(
        @Param('id') id: string
    ) {
        try {
            return this.inboxService.markAsRead(id);

        } catch (error) {
            throw error
        }
    }


    @Roles(Role.Member)
    @markAsFavouriteDoc()
    @Patch('mark_favourite/:id')
    markAsFavourite(
        @Param('id') id: string
    ) {
        try {
            return this.inboxService.markAsFavourite(id);
        } catch (error) {
            throw error
        }
    }

    @Roles(Role.Member)
    @markAsUnavouriteDoc()
    @Patch('mark_unfavourite/:id')
    markUnFavourite(
        @Param('id') id: string
    ) {
        try {
            return this.inboxService.markUnFavourite(id);
        } catch (error) {
            throw error
        }
    }

    //   @Patch(':id')
    //   update(@Param('id') id: string, @Body() updateInboxDto: UpdateInboxDto) {
    //     return this.inboxService.update(+id, updateInboxDto);
    //   }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.inboxService.remove(+id);
    //   }
}
