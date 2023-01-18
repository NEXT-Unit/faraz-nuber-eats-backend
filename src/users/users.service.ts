import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtService } from 'src/jwt/jwt.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly consfig: ConfigService,
    private readonly jwtService: JwtService,
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
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
