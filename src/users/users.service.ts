import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      const exists = await this.users.findOneBy({ email });
      if (exists) {
        return [false, 'There is a user with this email already'];
      }
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (error) {
      return [false, "Couldn't create account"];
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // find user with the email
    try {
      const user = await this.users.findOneBy({ email });
      if (!User) {
        return {
          ok: false,
          error: 'User does not exist',
        };
      }
      const PasswordCorrect = await user.checkPassword(password);
      if (!PasswordCorrect) {
        return {
          ok: false,
          error: 'wrong password',
        };
      }
      return {
        ok: true,
        token: 'llllllllllllllllllllllllll',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
