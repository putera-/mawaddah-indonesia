import { Test, TestingModule } from '@nestjs/testing';
import { AkadController } from './akad.controller';
import { AkadService } from './akad.service';

describe('AkadController', () => {
  let controller: AkadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AkadController],
      providers: [AkadService],
    }).compile();

    controller = module.get<AkadController>(AkadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
