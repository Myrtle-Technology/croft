import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';
import { AccountStrategy } from './account.strategy';
import { AccountRepository } from './account.repository';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountStrategy, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}
