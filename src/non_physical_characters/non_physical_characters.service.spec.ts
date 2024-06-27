import { Test, TestingModule } from '@nestjs/testing';
import { NonPhysicalCharactersService } from './non_physical_characters.service';

describe('NonPhysicalCharactersService', () => {
    let service: NonPhysicalCharactersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NonPhysicalCharactersService],
        }).compile();

        service = module.get<NonPhysicalCharactersService>(NonPhysicalCharactersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
