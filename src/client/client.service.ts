import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import { Client } from './client.interface';
import { Prisma } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateBlogDto } from 'src/blogs/dto/create-blog.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }
  
  create() {
    const data : Prisma.ClientCreateInput = {
      name: "-",
      phone: "-",
      address: "-"
    }
    return this.prisma.client.create({
      data
    });
  }

  async findOne() : Promise<Client> {
    let client  = await this.prisma.client.findFirst();
    if (!client) {
      // create dummy
      client = await this.create();
    }
    return client;
  }
   

  //lanjutin besok pagi ngab
  async update(data: UpdateClientDto) {
    await this.findOne();
    return this.prisma.client.update({
      where: {
        id: "a5e14d27-b86c-46c5-a7c7-6a451aabd308"
      },
      data 
    })
  }
  
 
}

