import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    HttpCode,
    HttpStatus,
    Req,
    ValidationPipe,
    Query,
} from '@nestjs/common';
import { TaarufService } from './taaruf.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { TaarufMessageDto } from './dto/taaruf-message.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    ApproveTaarufbyIdDoc,
    CancelTaarufbyIdDoc,
    CancelTaarufResponse,
    CreateTaarufDoc,
    GetAllIncomingTaarufDoc,
    GetAllOutgoingTaarufDoc,
    GetIncomingTaarufbyIdDoc,
    GetOutgoingTaarufbyIdDoc,
    RejectTaarufbyIdDoc,
} from './taaruf.doc';

@ApiBearerAuth()
@ApiTags('Taaruf')
@Controller('taaruf')
export class TaarufController {
    constructor(private readonly taarufService: TaarufService) {}

    @CreateTaarufDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Post(':candidateId')
    async create(
        @Param('candidateId') candidateId: string,
        @Req() req: any,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return await this.taarufService.create(
                req.user.id,
                candidateId,
                data.message,
            );
        } catch (error) {
            throw error;
        }
    }

    @GetAllIncomingTaarufDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('incoming')
    async allIncoming(
        @Req() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            return await this.taarufService.findAllIncoming(
                req.user.id,
                page,
                limit,
            );
        } catch (error) {
            throw error;
        }
    }

    @GetAllOutgoingTaarufDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('outgoing')
    async allOutgoing(
        @Req() req: any,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        try {
            return await this.taarufService.findAllOutgoing(
                req.user.id,
                page,
                limit,
            );
        } catch (error) {
            throw error;
        }
    }

    @GetIncomingTaarufbyIdDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('incoming/:id')
    async incoming(@Req() req: any, @Param('id') id: string) {
        try {
            return await this.taarufService.findIncoming(req.user.id, id);
        } catch (error) {
            throw error;
        }
    }

    @GetOutgoingTaarufbyIdDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Get('outgoing/:id')
    async outgoing(@Req() req: any, @Param('id') id: string) {
        try {
            return this.taarufService.findOutgoing(req.user.id, id);
        } catch (error) {
            throw error;
        }
    }

    @ApproveTaarufbyIdDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('approve/:id')
    async approve(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            const candidateId = req.user.id;
            return this.taarufService.approve(candidateId, id, data.message);
        } catch (error) {
            throw error;
        }
    }

    @RejectTaarufbyIdDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('reject/:id')
    async reject(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.taarufService.reject(req.user.id, id, data.message);
        } catch (error) {
            throw error;
        }
    }

    @CancelTaarufbyIdDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('cancel/:id')
    async cancel(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.taarufService.cancel(req.user.id, id, data.message);
        } catch (error) {
            throw error;
        }
    }

    @CancelTaarufResponse()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('cancel_response/:id')
    async cancel_response(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.taarufService.cancel_response(
                req.user.id,
                id,
                data.message,
            );
        } catch (error) {
            throw error;
        }
    }
}
