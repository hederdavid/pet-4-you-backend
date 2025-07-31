import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  jwtTtl: process.env.JWT_TTL,
  refreshSecret: process.env.REFRESH_JWT_SECRET,
  refreshTtl: process.env.REFRESH_JWT_TTL,
}));

