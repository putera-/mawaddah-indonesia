import { Test, TestingModule } from '@nestjs/testing';
import { LifeGoalsController } from './life_goals.controller';
import { LifeGoalsService } from './life_goals.service';

describe('LifeGoalsController', () => {
    let controller: LifeGoalsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LifeGoalsController],
            providers: [LifeGoalsService],
        }).compile();

        controller = module.get<LifeGoalsController>(LifeGoalsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
/*  */
