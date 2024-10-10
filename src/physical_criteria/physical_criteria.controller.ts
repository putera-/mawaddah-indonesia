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
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    GetPhysicalCriteriaByIdDoc,
    UpdatePhysicalCriteriaDoc,
} from './physical_criteria.doc';

@ApiTags('Physical Criteria')
@ApiBearerAuth()
@Controller('physical-criteria')
export class PhysicalCriteriaController {
    constructor(
        private readonly physicalCriteriaService: PhysicalCriteriaService,
        private readonly biodataService: BiodataService,
    ) {}

    @GetPhysicalCriteriaByIdDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata)
                throw new BadRequestException(
                    'Silakan isi biodata terlebih dahulu',
                );

            return this.physicalCriteriaService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @UpdatePhysicalCriteriaDoc()
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
            if (!biodata)
                throw new BadRequestException(
                    'Silakan isi biodata terlebih dahulu',
                );

            const dataSave: Prisma.PhysicalCriteriaCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } },
            };

            return this.physicalCriteriaService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
