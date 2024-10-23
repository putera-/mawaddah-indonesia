import { Controller, Get, Body, Patch, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EditClientDoc, GetClientDoc } from './client.doc';

@ApiTags('Client')
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @GetClientDoc()
    @Public()
    @Get()
    findOne() {
        return this.clientService.findOne();
    }

    @EditClientDoc()
    @ApiBearerAuth()
    @Roles(Role.Superadmin, Role.Admin)
    @Patch()
    update(@Body(new ValidationPipe()) data: UpdateClientDto) {
        return this.clientService.update(data);
    }
}
