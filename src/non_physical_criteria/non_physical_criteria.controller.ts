import {
    Controller,
    Get,
    Body,
    Patch,
    Request,
    BadRequestException,
    ValidationPipe,
} from '@nestjs/common';
import { NonPhysicalCriteriaService } from './non_physical_criteria.service';
import { UpdateNonPhysicalCriteriaDto } from './dto/update-non_physical_criteria.dto';
import { BiodataService } from 'src/biodata/biodata.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    GetNonPhysicalCriteriaDoc,
    UpdateNonPhysicalCriteriaDoc,
} from './non_physical_criteria.doc';

@ApiTags('Non Physical Criteria')
@ApiBearerAuth()
@Controller('non-physical-criteria')
export class NonPhysicalCriteriaController {
    constructor(
        private readonly nonPhysicalCriteriaService: NonPhysicalCriteriaService,
        private readonly biodataService: BiodataService,
    ) {}

    @GetNonPhysicalCriteriaDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata)
                throw new BadRequestException(
                    'Silakan isi biodata terlebih dahulu.',
                );

            return this.nonPhysicalCriteriaService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @UpdateNonPhysicalCriteriaDoc()
    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateNonPhysicalCriteriaDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            const dataSave: Prisma.NonPhysicalCriteriaCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } },
            };

            return this.nonPhysicalCriteriaService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
