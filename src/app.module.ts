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
import { LifeGoalsModule } from './life_goals/life_goals.module';
import { PhysicalCharsModule } from './physical_chars/physical_chars.module';
import { BiodataModule } from './biodata/biodata.module';
import { ProvinceModule } from './province/province.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CandidateModule } from './candidate/candidate.module';
import { ResetPasswordModule } from './reset_password/reset_password.module';
import { ActivationModule } from './activation/activation.module';
import { TaarufGoldModule } from './taaruf_gold/taaruf_gold.module';
import { PaymentModule } from './payment/payment.module';
import { TaarufModule } from './taaruf/taaruf.module';
import { AkadModule } from './akad/akad.module';
import { KhitbahModule } from './khitbah/khitbah.module';
import { NadharModule } from './nadhar/nadhar.module';
import { NonPhysicalCharactersModule } from './non_physical_characters/non_physical_characters.module';
import { FamilyMembersModule } from './family_members/family_members.module';
import { MarriagePreparationModule } from './marriage_preparation/marriage_preparation.module';
import { IbadahModule } from './ibadah/ibadah.module';
import { PhysicalCriteriaModule } from './physical_criteria/physical_criteria.module';
import { NonPhysicalCriteriaModule } from './non_physical_criteria/non_physical_criteria.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { InboxModule } from './inbox/inbox.module';
import { StatisticModule } from './statistic/statistic.module';
import { LandingPageModule } from './landing_page/landing_page.module';
import { BlogsModule } from './blogs/blogs.module';

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
        NadharModule,
        KhitbahModule,
        AkadModule,
        NonPhysicalCharactersModule,
        FamilyMembersModule,
        MarriagePreparationModule,
        IbadahModule,
        PhysicalCriteriaModule,
        NonPhysicalCriteriaModule,
        QuestionModule,
        AnswerModule,
        ExperiencesModule,
        InboxModule,
        StatisticModule,
        LandingPageModule,
        BlogsModule,
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
