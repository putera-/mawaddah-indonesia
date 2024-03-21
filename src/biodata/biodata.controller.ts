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
    @Get()
    async findAll() {
        try {
            return await this.biodataService.findAll();
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
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: CreateBiodatumDto) {
        try {
            return await this.biodataService.update(id, data);
        } catch (error) {
            throw error;
        }
    }

}
