import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    HttpCode,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { Role } from 'src/roles/role.enums';
import { Roles } from 'src/roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProvinceDoc, DeleteProvinceById, GetProvinceAll, GetProvinceById, UpdateProvinceById } from './province.doc';

@ApiBearerAuth()
@ApiTags('Province')
@Controller('province')
export class ProvinceController {
    constructor(private readonly provinceService: ProvinceService) {}

    @CreateProvinceDoc()
    @Roles(Role.Superadmin, Role.Admin)
    @Post()
    async create(@Body(new ValidationPipe()) data: CreateProvinceDto) {
        try {
            return await this.provinceService.create(data);
        } catch (error) {
            throw error;
        }
    }
    @GetProvinceAll()
    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get()
    async findAll() {
        return await this.provinceService.findAll();
    }
    @GetProvinceById()
    @Roles(Role.Superadmin, Role.Admin, Role.Member)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.provinceService.findOne(id);
    }

    @UpdateProvinceById()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: CreateProvinceDto) {
        return this.provinceService.update(id, data);
    }
    @DeleteProvinceById()
    @Roles(Role.Superadmin, Role.Admin)
    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            return this.provinceService.remove(id);
        } catch (error) {
            throw error;
        }
    }
}
