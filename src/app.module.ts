import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { ClientModule } from './client/client.module';
import { SliderModule } from './slider/slider.module';
import { PhotosModule } from './photos/photos.module';
import { GalleriesModule } from './galleries/galleries.module';
import { FaqsModule } from './faqs/faqs.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { EducationsModule } from './educations/educations.module';
import { UserSuperadminModule } from './user-superadmin/user-superadmin.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { SkillsModule } from './skills/skills.module';
import { HobbiesModule } from './hobbies/hobbies.module';
import { MarriedGoalsModule } from './married_goals/married_goals.module';
import { LifeGoalsModule } from './life_goals/life_goals.module';
import { PhysicalCharsModule } from './physical_chars/physical_chars.module';


@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        ClientModule,
        AuthModule,
        SliderModule,
        PhotosModule,
        GalleriesModule,
        FaqsModule,
        EducationsModule,
        UserSuperadminModule,
        UserAdminModule,
        SkillsModule,
        HobbiesModule,
        MarriedGoalsModule,
        LifeGoalsModule,
        PhysicalCharsModule,
       
    ],

    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
