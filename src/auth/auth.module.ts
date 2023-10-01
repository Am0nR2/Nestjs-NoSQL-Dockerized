import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { User, UserSchema } from './schemas/user-schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    DatabaseModule, 
    JwtModule.registerAsync({
      useFactory : (configService : ConfigService) => {
        return {
          secret : configService.getOrThrow("JWT_SECRET"),
          signOptions : {
            expiresIn : configService.getOrThrow("JWT_EXPIRE")
          }
        }
      },
      inject : [ConfigService]
    }),
    DatabaseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),

  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
