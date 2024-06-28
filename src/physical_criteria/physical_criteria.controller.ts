import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    BadRequestException,
    ValidationPipe,
} from '@nestjs/common';
import { PhysicalCriteriaService } from './physical_criteria.service';
import { CreatePhysicalCriteriaDto } from './dto/create-physical_criteria.dto';
import { BiodataService } from 'src/biodata/biodata.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { UpdatePhysicalCriteriaDto } from './dto/update-physical_criteria.dto';

@Controller('physical-criteria')
export class PhysicalCriteriaController {
    constructor(
        private readonly physicalCriteriaService: PhysicalCriteriaService,
        private readonly biodataService: BiodataService,
    ) {}
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            return this.physicalCriteriaService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdatePhysicalCriteriaDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            return this.physicalCriteriaService.upsert(biodata.id, data);
        } catch (error) {
            throw error;
        }
    }
}
