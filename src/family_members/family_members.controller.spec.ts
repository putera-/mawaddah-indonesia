import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMembersController } from './family_members.controller';
import { FamilyMembersService } from './family_members.service';

describe('FamilyMembersController', () => {
  let controller: FamilyMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyMembersController],
      providers: [FamilyMembersService],
    }).compile();

    controller = module.get<FamilyMembersController>(FamilyMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});