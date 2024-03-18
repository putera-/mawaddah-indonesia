import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/auth.metadata';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  

  @Public()
  @Get()
  findOne() {
    return this.clientService.findOne();
  }
 
  @Roles(Role.Superadmin, Role.Admin)
  @Patch()
  update(@Body(new ValidationPipe()) data: UpdateClientDto) {
    return this.clientService.update(data);
  }

 
}
