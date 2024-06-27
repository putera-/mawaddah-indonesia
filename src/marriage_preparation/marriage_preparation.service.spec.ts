import { Test, TestingModule } from '@nestjs/testing';
import { MarriagePreparationService } from './marriage_preparation.service';

describe('MarriagePreparationService', () => {
    let service: MarriagePreparationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MarriagePreparationService],
        }).compile();

        service = module.get<MarriagePreparationService>(MarriagePreparationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
