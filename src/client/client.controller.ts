import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Prisma } from '@prisma/client';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  

  @Get()
  findOne() {
    return this.clientService.findOne();
  }
 
  @Patch()
  update(@Body(new ValidationPipe()) data: UpdateClientDto) {
    return this.clientService.update(data);
  }

 
}
