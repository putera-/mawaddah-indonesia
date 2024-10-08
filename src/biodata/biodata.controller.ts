import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    ValidationPipe,
    Request,
    HttpStatus,
    HttpException,
    ForbiddenException,
} from '@nestjs/common';
import { BiodataService } from './biodata.service';
import { CreateBiodatumDto } from './dto/create-biodatum.dto';
import { UpdateBiodataDto } from './dto/update-biodata.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBiodataDoc, GetBiodataDoc, UpdateBiodataDoc } from './biodata.doc';

@ApiTags('Biodata')
@ApiBearerAuth()
@Controller('biodata')
export class BiodataController {
    constructor(private readonly biodataService: BiodataService) { }

    @Roles(Role.Member)
    @Post()
    @CreateBiodataDoc()
    async create(
        @Request() req: any,
        @Body(new ValidationPipe()) data: CreateBiodatumDto,
    ) {
        try {
            return await this.biodataService.create(
                req.user.id,
                data as Prisma.BiodataCreateInput,
            );
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Get()
    @GetBiodataDoc()
    async findMe(@Request() req: any) {
        try {
            const me = req.user.id;
            const biodata = await this.biodataService.findMeComplete(me);

            if (!biodata) {
                // Biodata belum dibuat
                throw new HttpException({}, HttpStatus.NO_CONTENT);
            }

            return biodata;
        } catch (error) {
            throw error;
        }
    }

    @Roles(Role.Member)
    @Patch()
    @UpdateBiodataDoc()
    async update(
        @Request() req: any,
        @Body(new ValidationPipe()) data: UpdateBiodataDto,
    ) {
        try {
            return await this.biodataService.update(
                req.user.id,
                data as Prisma.BiodataUpdateInput,
            );
        } catch (error) {
            throw error;
        }
    }
}
