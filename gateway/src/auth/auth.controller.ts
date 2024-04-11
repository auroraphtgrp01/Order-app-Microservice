import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { Public } from '../../src/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @Public()
  @Post('register')
  registerUser(@Body() registerBody: RegisterUserDto) {
    return this.authService.register(registerBody);
  }
}
