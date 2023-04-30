import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorators';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailInput, VerifyEmailOuput } from './dtos/verify-email.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Role } from 'src/auth/role.decorator';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly UsersService: UsersService) {}
  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') CreateAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.UsersService.createAccount(CreateAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') LoginInput: LoginInput): Promise<LoginOutput> {
    return this.UsersService.login(LoginInput);
  }

  @Query((returns) => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query((returns) => UserProfileOutput)
  @Role(['Any'])
  async userProfile(
    @Args() UserProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return await this.UsersService.findById(UserProfileInput.userId);
  }

  @Mutation((returns) => EditProfileOutput)
  @Role(['Any'])
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return await this.UsersService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation((returns) => VerifyEmailOuput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOuput> {
    const { ok, error } = await this.UsersService.verifyEmail(code);
    return { ok, error };
  }
}
