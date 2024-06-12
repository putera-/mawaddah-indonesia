import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, NotFoundException, HttpCode, Query, BadRequestException } from '@nestjs/common';
import { PhysicalCharsService } from './physical_chars.service';
import { CreatePhysicalCharDto } from './dto/create-physical_char.dto';
import { UpdatePhysicalCharDto } from './dto/update-physical_char.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { BiodataService } from 'src/biodata/biodata.service';

@Controller('physical_chars')
export class PhysicalCharsController {
    constructor(
        private readonly physicalCharsService: PhysicalCharsService,
        private readonly biodataService: BiodataService
    ) { }
    @Roles(Role.Member)
    @Get()
    async findOne(@Request() req: any) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException()

            return this.physicalCharsService.findOne(userId, biodata.id);

        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch()
    async update(@Request() req: any, @Body(new ValidationPipe()) data: UpdatePhysicalCharDto) {
        const userId = req.user.id
        try {
            const biodata = await this.biodataService.findMe(userId)

            // check apakah biodata!= null > jika masih null throw error
            if (!biodata) throw new BadRequestException()

            return this.physicalCharsService.upsert(biodata.id, data);

        } catch (error) {
            throw error;
        }
    }

}
