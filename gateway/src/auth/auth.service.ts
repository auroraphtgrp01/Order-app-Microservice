import { comparePassword, hashPassword } from './../utils/hashPassword';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable, lastValueFrom } from 'rxjs';
import { MESSAGES_RESPONSE } from '../../src/constants/messages.constant';
import { Response } from 'express';
import { UsersService } from '../../src/users/users.service';
import { RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = (
      await lastValueFrom(this.userService.findAll({ email: email }))
    ).data[0];
    if (user.length === 0) {
      return null;
    }
    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }

  async login(
    user: any,
    res: Response,
  ): Promise<{
    message: string;
    id: any;
    email: any;
    username: any;
    token: {
      refresh_token: string;
      access_token: string;
    };
  }> {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const [refreshToken, accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESHTOKEN_EXPIRESIN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESSTOKEN_EXPIRESIN'),
      }),
    ]);
    this.userService
      .updateRefreshToken({
        user: {
          id: user.id,
          email: user.email,
        },
        token: refreshToken,
      })
      .subscribe({
        error: (err: any) => {
          throw new HttpException(
            'Error when update Refresh Token',
            HttpStatus.BAD_REQUEST,
          );
        },
      });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000000,
    });

    return {
      message: MESSAGES_RESPONSE.LOGIN_SUCCESSFULLY,
      id: user.id,
      email: user.email,
      username: user.username,
      token: {
        refresh_token: refreshToken,
        access_token: accessToken,
      },
    };
  }

  async register(registerBody: RegisterUserDto): Promise<Observable<any>> {
    const password = await hashPassword(registerBody.password);
    return this.userService.registerUser({
      ...registerBody,
      password,
    });
  }
}
