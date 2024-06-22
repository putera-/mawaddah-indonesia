import { Module } from '@nestjs/common';
import { MarriagePreparationService } from './marriage_preparation.service';
import { MarriagePreparationController } from './marriage_preparation.controller';

@Module({
  controllers: [MarriagePreparationController],
  providers: [MarriagePreparationService],
})
export class MarriagePreparationModule {}
