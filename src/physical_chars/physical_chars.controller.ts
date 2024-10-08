import {
    Controller,
    Get,
    Body,
    Patch,
    ValidationPipe,
    Request,
    BadRequestException,
} from '@nestjs/common';
import { PhysicalCharsService } from './physical_chars.service';
import { UpdatePhysicalCharDto } from './dto/update-physical_char.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { BiodataService } from 'src/biodata/biodata.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetPhysicalCharsDoc, PatchPhysicalCharsDoc } from './physical_chars.doc';

@ApiBearerAuth()
@ApiTags('Physical-Characteristics')
@Controller('physical_chars')
export class PhysicalCharsController {
    constructor(
        private readonly physicalCharsService: PhysicalCharsService,
        private readonly biodataService: BiodataService,
    ) { }

    @GetPhysicalCharsDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            return this.physicalCharsService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @PatchPhysicalCharsDoc()
    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdatePhysicalCharDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            const dataSave: Prisma.PhysicalCharacterCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } }
            };

            return this.physicalCharsService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
