import { Test, TestingModule } from '@nestjs/testing';
import { IbadahService } from './ibadah.service';

describe('IbadahService', () => {
  let service: IbadahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IbadahService],
    }).compile();

    service = module.get<IbadahService>(IbadahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
