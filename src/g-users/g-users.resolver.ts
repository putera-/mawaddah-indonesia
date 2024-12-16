import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GUsersService } from './g-users.service';
import { GUser } from './entities/g-user.entity';
import { CreateGUserInput } from './dto/create-g-user.input';
import { UpdateGUserInput } from './dto/update-g-user.input';

@Resolver(() => GUser)
export class GUsersResolver {
    constructor(private readonly gUsersService: GUsersService) { }

    @Mutation(() => GUser)
    createGUser(@Args('createGUserInput') createGUserInput: CreateGUserInput) {
        return this.gUsersService.create(createGUserInput);
    }

    @Query(() => [GUser], { name: 'gUsers' })
    findAll() {
        return this.gUsersService.findAll();
    }

    @Query(() => GUser, { name: 'gUser' })
    findOne(@Args('id', { type: () => String }) id: string) {
        try {
            return this.gUsersService.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    @Mutation(() => GUser)
    updateGUser(@Args('updateGUserInput') updateGUserInput: UpdateGUserInput) {
        return this.gUsersService.update(updateGUserInput.id, updateGUserInput);
    }

    @Mutation(() => GUser)
    removeGUser(@Args('id', { type: () => Int }) id: number) {
        return this.gUsersService.remove(id);
    }
}
