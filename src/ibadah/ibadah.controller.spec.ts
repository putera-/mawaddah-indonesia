import { Test, TestingModule } from '@nestjs/testing';
import { IbadahController } from './ibadah.controller';
import { IbadahService } from './ibadah.service';

describe('IbadahController', () => {
  let controller: IbadahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IbadahController],
      providers: [IbadahService],
    }).compile();

    controller = module.get<IbadahController>(IbadahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
