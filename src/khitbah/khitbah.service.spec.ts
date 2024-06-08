import { Test, TestingModule } from '@nestjs/testing';
import { KhitbahService } from './khitbah.service';

describe('KhitbahService', () => {
  let service: KhitbahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KhitbahService],
    }).compile();

    service = module.get<KhitbahService>(KhitbahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
