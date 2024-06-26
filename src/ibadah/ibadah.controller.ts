import {
    Controller,
    Get,
    Body,
    Patch,
    Request,
    BadRequestException,
    ValidationPipe,
} from '@nestjs/common';
import { BiodataService } from 'src/biodata/biodata.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { IbadahService } from './ibadah.service';
import { UpdateIbadahDto } from './dto/update-ibadah.dto';

@Controller('ibadah')
export class IbadahController {
    constructor(
        private readonly ibadahService: IbadahService,
        private readonly biodataService: BiodataService,
    ) {}

    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata)
                throw new BadRequestException(
                    'Harap isi biodata terlebih dahulu',
                );

            return this.ibadahService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateIbadahDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata)
                throw new BadRequestException(
                    'Harap isi biodata terlebih dahulu',
                );

            return this.ibadahService.upsert(biodata.id, data);
        } catch (error) {
            throw error;
        }
    }
}
