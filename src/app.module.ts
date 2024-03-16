import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot(), UsersModule, ClientModule, AuthModule],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
