import { Controller, Get, Body, Patch, Request, BadRequestException, ValidationPipe } from '@nestjs/common';
import { MarriagePreparationService } from './marriage_preparation.service';
import { CreateMarriagePreparationDto } from './dto/create-marriage_preparation.dto';
import { UpdateMarriagePreparationDto } from './dto/update-marriage_preparation.dto';
import { BiodataService } from 'src/biodata/biodata.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('marriage_preparation')
export class MarriagePreparationController {
  constructor(
    private readonly marriagePreparationService: MarriagePreparationService,
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

      return this.marriagePreparationService.findOne(userId, biodata.id);

    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.Member)
  @Patch()
  async update(@Request() req: any, @Body(new ValidationPipe()) data: UpdateMarriagePreparationDto) {
    const userId = req.user.id
    try {
      const biodata = await this.biodataService.findMe(userId)

      // check apakah biodata!= null > jika masih null throw error
      if (!biodata) throw new BadRequestException()

      return this.marriagePreparationService.upsert(biodata.id, data);

    } catch (error) {
      throw error;
    }
  }

}
