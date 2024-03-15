import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import { ClientModule } from './client/client.module';

@Module({
    imports: [ConfigModule.forRoot(), BlogsModule, ClientModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
