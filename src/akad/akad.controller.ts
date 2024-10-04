import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Request,
    Req,
    ValidationPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AkadService } from './akad.service';
import { CreateAkadDto } from './dto/create-akad.dto';
import { UpdateAkadDto } from './dto/update-akad.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApproveAkadDoc, CancelAkadDoc, CreateAkadDoc, GetAllAkadDoc, GetByIdAkadDoc, RejectAkadDoc, UpdateAkadDoc } from './akad.doc';
import { TaarufMessageDto } from 'src/taaruf/dto/taaruf-message.dto';

@ApiTags('Akad')
@ApiBearerAuth()
@Controller('akad')
export class AkadController {
    constructor(private readonly akadService: AkadService) { }

    @GetAllAkadDoc()
    @Get('requests')
    async getAll(@Request() req: any) {
        const userId = req.user.id;
        try {
            return this.akadService.getAll(userId);
        } catch (error) {
            console.log(error);
        }
    }

    @GetByIdAkadDoc()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return this.akadService.findOne(id);
        } catch (error) {
            console.log(error);
        }
    }

    @CreateAkadDoc()
    @Roles(Role.Member)
    @Post(':taarufid')
    async create(
        @Request() req: any,
        @Param('taarufid') taarufId: string,
        @Body() data: CreateAkadDto,
    ) {
        const userId = req.user.id;
        try {
            return this.akadService.create(data, userId, taarufId);
        } catch (error) {
            console.log(error);
        }
    }

    @UpdateAkadDoc()
    @Roles(Role.Member)
    @Patch(':id')
    update(

        @Param('id') id: string,
        @Body() data: UpdateAkadDto,) {
        try {
            return this.akadService.update(id, data);

        } catch (error) {
            console.log(error);
        }
    }

    @CancelAkadDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('cancel/:id')
    cancel(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.akadService.cancel(req.user.id, id, data.message);

        } catch (error) {
            console.log(error);
        }
    }

    @ApproveAkadDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('approve/:id')
    approve(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.akadService.approve(req.user.id, id, data.message);

        } catch (error) {
            console.log(error);
        }
    }


    @RejectAkadDoc()
    @Roles(Role.Member)
    @HttpCode(HttpStatus.OK)
    @Patch('reject/:id')
    reject(
        @Req() req: any,
        @Param('id') id: string,
        @Body(new ValidationPipe()) data: TaarufMessageDto,
    ) {
        try {
            return this.akadService.reject(req.user.id, id, data.message);

        } catch (error) {
            console.log(error);
        }
    }

}
