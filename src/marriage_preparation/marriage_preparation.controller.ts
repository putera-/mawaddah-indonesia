import { Controller, Get, Body, Patch, Request, BadRequestException, ValidationPipe } from '@nestjs/common';
import { MarriagePreparationService } from './marriage_preparation.service';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';
import { UpdateMarriagePreparationDto } from './dto/update-marriage_preparation.dto';
import { BiodataService } from 'src/biodata/biodata.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { GetMarriagePreparationsDoc, PatchMarriagePreparationsDoc } from './marriage_preparation.doc';

@ApiTags('Marriage Preparation')
@Controller('marriage_preparation')
export class MarriagePreparationController {
    constructor(
        private readonly marriagePreparationService: MarriagePreparationService,
        private readonly biodataService: BiodataService
    ) { }

    @GetMarriagePreparationsDoc()
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException()

            return this.marriagePreparationService.findOne(userId, biodata.id);

        } catch (error) {
            throw error;
        }
    }

    @PatchMarriagePreparationsDoc()
    @Roles(Role.Member)
    @Patch()
    async update(@Request() req: any, @Body(new ValidationPipe()) data: UpdateMarriagePreparationDto) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException();

            const dataSave: Prisma.MarriagePreparationCreateInput = {
                ...data,
                biodata: { connect: { id: biodata.id } }
            }

            return this.marriagePreparationService.upsert(biodata.id, dataSave);

        } catch (error) {
            throw error;
        }
    }

}
