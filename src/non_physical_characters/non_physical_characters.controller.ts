import {
    Controller,
    Get,
    Body,
    Patch,
    ValidationPipe,
    Request,
    BadRequestException,
} from '@nestjs/common';
import { NonPhysicalCharactersService } from './non_physical_characters.service';
import { UpdateNonPhysicalCharacterDto } from './dto/update-non_physical_character.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { BiodataService } from 'src/biodata/biodata.service';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    GetnonPhysicalDoc,
    PatchnonPhysicalDoc,
} from './non_physical_characters.doc';

@ApiTags('Non Physical Characters')
@ApiBearerAuth()
@Controller('non_physical_characters')
export class NonPhysicalCharactersController {
    constructor(
        private readonly nonPhysicalService: NonPhysicalCharactersService,
        private readonly biodataService: BiodataService,
    ) {}

    @GetnonPhysicalDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            return this.nonPhysicalService.findOne(userId, biodata.id);
        } catch (error) {
            throw error;
        }
    }

    @PatchnonPhysicalDoc()
    @Roles(Role.Member)
    @Patch()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateNonPhysicalCharacterDto,
    ) {
        const userId = req.user.id;
        try {
            const biodata = await this.biodataService.findMe(userId);

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            const dataSave: Prisma.NonPhysicalCharacterCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } },
            };

            return this.nonPhysicalService.upsert(biodata.id, dataSave);
        } catch (error) {
            throw error;
        }
    }
}
