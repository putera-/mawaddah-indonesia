import { Test, TestingModule } from '@nestjs/testing';
import { GUsersResolver } from './g-users.resolver';
import { GUsersService } from './g-users.service';

describe('GUsersResolver', () => {
  let resolver: GUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GUsersResolver, GUsersService],
    }).compile();

    resolver = module.get<GUsersResolver>(GUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
