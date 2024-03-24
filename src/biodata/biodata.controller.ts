import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    Request,
} from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { CreateBiodatumDto } from './dto/create-biodatum.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('biodata')
export class BiodataController {
    constructor(private readonly biodataService: BiodataService) {}

    @Roles(Role.Member)
    @Post()
    async create(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateBiodatumDto,
    ) {
        try {
            return await this.biodataService.create(req.user.id, data);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get('all')
    async findAll(@Request() req: any) {
        try {
            const user = await this.biodataService.findMe(req.user.id);
            return await this.biodataService.findAll(user.gender);
        } catch (error) {
            throw error;
        }
    }
    @Roles(Role.Member)
    @Get()
    async findMe(@Request() req: any) {
        try {
            const me = req.user.id;
            return await this.biodataService.findMe(me);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.biodataService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch('')
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateBiodatumDto,
    ) {
        try {
            return await this.biodataService.update(req.user.id, data);
        } catch (error) {
            throw error;
        }
    }
}
