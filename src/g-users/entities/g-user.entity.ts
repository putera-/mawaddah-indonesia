import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GUser {
    @Field(() => String, { description: 'User ID' })
    id: string;

    @Field(() => Int, { description: 'Legacy ID', nullable: true })
    old_id?: number;

    @Field(() => String, { description: 'User email' })
    email: string;

    @Field(() => String, { description: 'User first name' })
    firstname: string;

    @Field(() => String, { description: 'User last name' })
    lastname: string;

    @Field(() => Boolean, { description: 'User active status', defaultValue: false })
    active: boolean;

    @Field(() => Boolean, { description: 'User verification status', defaultValue: false })
    verified: boolean;

    @Field(() => String, { description: 'User avatar URL', nullable: true })
    avatar?: string;
}
