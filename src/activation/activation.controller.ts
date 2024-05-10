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

@Controller('activation')
export class ActivationController {
    constructor(private readonly activationService: ActivationService) {}


    @Get()
    findAll() {
        return this.activationService.findAll();
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activationService.remove(+id);
    }
}
