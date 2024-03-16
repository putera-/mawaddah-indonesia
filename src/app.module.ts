import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { SliderModule } from './slider/slider.module';
import { PhotosModule } from './photos/photos.module';
import { GalleriesModule } from './galleries/galleries.module';
import { FaqsModule } from './faqs/faqs.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, AuthModule, ClientModule],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
