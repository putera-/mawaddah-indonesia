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
import { Prisma } from '@prisma/client';
import { Ibadah } from './ibadah.interface';
import { ApiTags } from '@nestjs/swagger';
import { GetIbadahDoc, PatchIbadahDoc } from './ibadah.doc';

@ApiTags('Ibadah')
@Controller('ibadah')
export class IbadahController {
    constructor(
        private readonly ibadahService: IbadahService,
        private readonly biodataService: BiodataService,
    ) {}

    @GetIbadahDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any): Promise<Ibadah> {
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
    
    @PatchIbadahDoc()
    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateIbadahDto,
    ): Promise<Ibadah> {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata)
                throw new BadRequestException(
                    'Harap isi biodata terlebih dahulu',
                );

            const dataSave: Prisma.IbadahCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } },
            };

            return this.ibadahService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
