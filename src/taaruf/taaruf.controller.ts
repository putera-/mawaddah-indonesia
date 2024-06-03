import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Req,
    ValidationPipe,
    Query,
} from '@nestjs/common';
import { TaarufService } from './taaruf.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { UsersService } from 'src/users/user.service';

@Controller('taaruf')
export class TaarufController {
    constructor(
        private readonly taarufService: TaarufService,
        private readonly User: UsersService,
    ) {}

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Post(':candidateId')
    async create(
        @Param('id') id: string,
        @Req() req: any,
        @Body() message: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return await this.taarufService.create(user.id, id, message);
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('incoming')
    async allIncoming(
        @Req() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return await this.taarufService.findAllIncoming(
                user.id,
                page,
                limit,
            );
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('outgoing')
    async allOutgoing(
        @Req() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return await this.taarufService.findAllOutgoing(
                user.id,
                page,
                limit,
            );
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('incoming/:id')
    async incoming(@Req() req: any, @Param() id: string) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return await this.taarufService.findIncoming(user.id, id);
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('outgoing/:id')
    async outgoing(@Req() req: any, @Param() id: string) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            const userId = user.id;
            return this.taarufService.findOutgoing(user.id, id);
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('approve/:id')
    async approve(
        @Req() req: any,
        @Param() id: string,
        @Body(new ValidationPipe()) message: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return this.taarufService.approve(user.id, id, message);
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('reject/:id')
    async reject(
        @Req() req: any,
        @Param() id: string,
        @Body(new ValidationPipe()) message: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return this.taarufService.reject(user.id, id, message);
        } catch (error) {
            console.log(error);
        }
    }

    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('cancel/:id')
    async cancel(
        @Req() req: any,
        @Param() id: string,
        @Body(new ValidationPipe()) message: string,
    ) {
        try {
            const user = await this.User.findOne(req.id, req.role);
            return this.taarufService.cancel(user.id, id, message);
        } catch (error) {
            console.log(error);
        }
    }
}
