import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaarufGoldService } from './taaruf_gold.service';
import { CreateTaarufGoldDto } from './dto/create-taaruf_gold.dto';
import { UpdateTaarufGoldDto } from './dto/update-taaruf_gold.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';


@Controller('taaruf-gold')
export class TaarufGoldController {
    constructor(private readonly taarufGoldService: TaarufGoldService) { }

        @Get('active-users')
        findAllActiveUsers() {
            return this.taarufGoldService.findAllActiveUser();
        }

        @Get('inactive-users')
        findAllInActiveUsers() {
            return this.taarufGoldService.findAllInActiveUser();
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
            return this.taarufGoldService.findOne(id);
        }

    // @Post()
    // create(@Body() createTaarufGoldDto: CreateTaarufGoldDto) {
    //     return this.taarufGoldService.create(createTaarufGoldDto);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTaarufGoldDto: UpdateTaarufGoldDto) {
    //     return this.taarufGoldService.update(+id, updateTaarufGoldDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.taarufGoldService.remove(+id);
    // }
}
