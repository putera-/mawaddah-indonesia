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

@Controller('non_physical_criteria')
export class NonPhysicalCriteriaController {
    constructor(
        private readonly nonPhysicalCriteriaService: NonPhysicalCriteriaService,
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

            return this.nonPhysicalCriteriaService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

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

            return this.nonPhysicalCriteriaService.upsert(biodata.id, data);
        } catch (error) {
            throw error;
        }
    }
}
