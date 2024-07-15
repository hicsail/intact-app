import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user';
import { UserInput } from './user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => User)
  async getUserByID(@Args('id') id: string) {
    return this.userService.getUserByID(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('input') input: UserInput) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
