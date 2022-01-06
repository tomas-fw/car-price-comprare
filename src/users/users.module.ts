import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { EncryptionService } from './encryption.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    EncryptionService,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
  ],
})
export class UsersModule {}
