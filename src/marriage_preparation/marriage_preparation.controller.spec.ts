import { Test, TestingModule } from '@nestjs/testing';
import { MarriagePreparationController } from './marriage_preparation.controller';
import { MarriagePreparationService } from './marriage_preparation.service';

describe('MarriagePreparationController', () => {
    let controller: MarriagePreparationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MarriagePreparationController],
            providers: [MarriagePreparationService],
        }).compile();

        controller = module.get<MarriagePreparationController>(MarriagePreparationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
