import { Test, TestingModule } from '@nestjs/testing';
import { NonPhysicalCharactersController } from './non_physical_characters.controller';
import { NonPhysicalCharactersService } from './non_physical_characters.service';

describe('NonPhysicalCharactersController', () => {
  let controller: NonPhysicalCharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonPhysicalCharactersController],
      providers: [NonPhysicalCharactersService],
    }).compile();

    controller = module.get<NonPhysicalCharactersController>(NonPhysicalCharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
