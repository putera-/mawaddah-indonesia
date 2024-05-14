import { Test, TestingModule } from '@nestjs/testing';
import { TokenizerController } from './tokenizer.controller';
import { TokenizerService } from './tokenizer.service';

describe('TokenizerController', () => {
  let controller: TokenizerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenizerController],
      providers: [TokenizerService],
    }).compile();

    controller = module.get<TokenizerController>(TokenizerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
