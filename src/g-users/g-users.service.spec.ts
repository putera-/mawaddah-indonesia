import { Test, TestingModule } from '@nestjs/testing';
import { GUsersService } from './g-users.service';

describe('GUsersService', () => {
  let service: GUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GUsersService],
    }).compile();

    service = module.get<GUsersService>(GUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
