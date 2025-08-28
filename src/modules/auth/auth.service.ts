import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from 'generated/prisma';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email, deletedAt: null },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const { password, refresh_token, ...result } = user;
    return result as User;
  }

  async signin(user: User, res: Response) {
    const tokens = await this._getTokens(user.id, user.email, user.role);
    await this._updateRefreshToken(user.id, tokens.refreshToken);

    this._setCookies(res, tokens.accessToken, tokens.refreshToken);

    return {
      message: 'Login bem-sucedido!',
      user: user,
    };
  }

  async logout(userId: string, res: Response) {
    await this.prisma.user.update({
      where: { id: userId, refresh_token: { not: null } },
      data: { refresh_token: null },
    });

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return { message: 'Logout realizado com sucesso!' };
  }

  async refreshTokens(userId: string, refreshToken: string, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Acesso negado.');
    }

    const refreshTokenMatches = await this.hashingService.compare(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Acesso negado.');
    }

    const tokens = await this._getTokens(user.id, user.email, user.role);
    await this._updateRefreshToken(user.id, tokens.refreshToken);

    this._setCookies(res, tokens.accessToken, tokens.refreshToken);
    return { message: 'Tokens atualizados com sucesso!' };
  }

  private async _updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await this.hashingService.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refresh_token: hashedToken },
    });
  }

  private async _getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: this.configService.get<string>('auth.accessTokenSecret'),
          expiresIn: this.configService.get<string>(
            'auth.accessTokenExpiration',
          ),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: this.configService.get<string>('auth.refreshTokenSecret'),
          expiresIn: this.configService.get<string>(
            'auth.refreshTokenExpiration',
          ),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private _setCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  async loginWithFirebase(token: string): Promise<User> {
    try {
      const firebaseUser = await this.firebaseService
        .getAuth()
        .verifyIdToken(token);

      if (!firebaseUser.phone_number) {
        throw new UnauthorizedException(
          'Token do Firebase inválido ou sem número de telefone.',
        );
      }

      let user = await this.prisma.user.findUnique({
        where: { firebaseUid: firebaseUser.uid },
      });

      if (!user) {
        const phone = firebaseUser.phone_number.replace('+55', '');
        user = await this.prisma.user.findFirst({
          where: { phone },
        });

        if (user) {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: { firebaseUid: firebaseUser.uid },
          });
        }
      }

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      const { password, refresh_token, ...result } = user;
      return result as User;
    } catch (error) {
      throw new UnauthorizedException('Falha na autenticação com o Firebase.');
    }
  }

  async getFirebaseToken(userId: string): Promise<string> {
    try {
      const firebaseToken = await this.firebaseService
        .getAuth()
        .createCustomToken(userId);
      return firebaseToken;
    } catch (error) {
      throw new InternalServerErrorException(
        'Falha ao gerar token do Firebase.',
      );
    }
  }
}
