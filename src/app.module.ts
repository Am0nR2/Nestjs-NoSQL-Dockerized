import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './error/error.interceptor';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt-strategy';

@Module({
  imports: [
    BookModule, 
    DatabaseModule, 
    ConfigModule, AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide : APP_INTERCEPTOR,
      useClass : ErrorInterceptor
    },
  ],
  
})
export class AppModule {}
