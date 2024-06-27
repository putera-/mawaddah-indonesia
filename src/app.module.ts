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
import { HobbiesModule } from './hobbies/hobbies.module';
import { MarriedGoalsModule } from './married_goals/married_goals.module';
import { LifeGoalsModule } from './life_goals/life_goals.module';
import { PhysicalCharsModule } from './physical_chars/physical_chars.module';
import { BiodataModule } from './biodata/biodata.module';
import { ProvinceModule } from './province/province.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CandidateModule } from './candidate/candidate.module';
import { ResetPasswordModule } from './reset_password/reset_password.module';
import { SkillsModule } from './skills/skills.module';
import { ActivationModule } from './activation/activation.module';
import { TaarufGoldModule } from './taaruf_gold/taaruf_gold.module';
import { PaymentModule } from './payment/payment.module';
import { TaarufModule } from './taaruf/taaruf.module';
import { AkadModule } from './akad/akad.module';
import { KhitbahModule } from './khitbah/khitbah.module';
import { NadharModule } from './nadhar/nadhar.module';
import { TaarufApprovalModule } from './taaruf_approval/taaruf_approval.module';
import { NonPhysicalCharactersModule } from './non_physical_characters/non_physical_characters.module';
import { FamilyMembersModule } from './family_members/family_members.module';
import { MarriagePreparationModule } from './marriage_preparation/marriage_preparation.module';
import { IbadahModule } from './ibadah/ibadah.module';
import { NonPhysicalCriteriaModule } from './non_physical_criteria/non_physical_criteria.module';

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
        HobbiesModule,
        SkillsModule,
        MarriedGoalsModule,
        LifeGoalsModule,
        PhysicalCharsModule,
        BiodataModule,
        ProvinceModule,
        BookmarkModule,
        CandidateModule,
        ResetPasswordModule,
        ConfigModule,
        ActivationModule,
        TaarufGoldModule,
        PaymentModule,
        TaarufModule,
        TaarufApprovalModule,
        NadharModule,
        KhitbahModule,
        AkadModule,
        NonPhysicalCharactersModule,
        FamilyMembersModule,
        MarriagePreparationModule,
        IbadahModule,
        NonPhysicalCriteriaModule,
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
export class AppModule { }
