import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response, Request } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';
import { FirebaseLoginDto } from './dto/firebase-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(loginDto);
    return this.authService.signin(user, res);
  }

  @Post('firebase-login')
  @HttpCode(HttpStatus.OK)
  async firebaseLogin(
    @Body() firebaseLoginDto: FirebaseLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.loginWithFirebase(firebaseLoginDto.token);
    return this.authService.signin(user, res);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    return this.authService.logout(user.userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    return this.authService.refreshTokens(user.sub, user.refreshToken, res);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
