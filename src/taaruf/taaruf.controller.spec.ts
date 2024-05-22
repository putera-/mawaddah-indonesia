import { Test, TestingModule } from '@nestjs/testing';
import { TaarufController } from './taaruf.controller';
import { TaarufService } from './taaruf.service';

describe('TaarufController', () => {
  let controller: TaarufController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaarufController],
      providers: [TaarufService],
    }).compile();

    controller = module.get<TaarufController>(TaarufController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
