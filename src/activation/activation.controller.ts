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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteActivationDoc, GetAllActivationDoc } from './activation.doc';

@ApiTags('Activations')
@ApiBearerAuth()
@Controller('activation')
export class ActivationController {
    constructor(private readonly activationService: ActivationService) {}

    @GetAllActivationDoc()
    @Get()
    findAll() {
        return this.activationService.findAll();
    }

    @DeleteActivationDoc()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activationService.remove(+id);
    }
}
