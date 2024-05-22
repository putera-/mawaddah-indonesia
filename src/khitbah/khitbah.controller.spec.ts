import { Test, TestingModule } from '@nestjs/testing';
import { KhitbahController } from './khitbah.controller';
import { KhitbahService } from './khitbah.service';

describe('KhitbahController', () => {
  let controller: KhitbahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KhitbahController],
      providers: [KhitbahService],
    }).compile();

    controller = module.get<KhitbahController>(KhitbahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
