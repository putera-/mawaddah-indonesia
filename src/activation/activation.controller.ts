import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ActivationService } from './activation.service';
// import { CreateActivationDto } from './dto/create-activation.dto';
// import { Public } from 'src/auth/auth.metadata';

@Controller('activation')
export class ActivationController {
    constructor(private readonly activationService: ActivationService) {}

    // @Public()
    // @Post()
    // create(@Body() data: CreateActivationDto) {
    //     return this.activationService.create(data);
    // }

    @Get()
    findAll() {
        return this.activationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activationService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activationService.remove(+id);
    }
}
