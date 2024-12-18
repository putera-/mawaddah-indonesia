import { Test, TestingModule } from '@nestjs/testing';
import { LandingPageController } from './landing_page.controller';
import { LandingPageService } from './landing_page.service';

describe('LandingPageController', () => {
  let controller: LandingPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandingPageController],
      providers: [LandingPageService],
    }).compile();

    controller = module.get<LandingPageController>(LandingPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
