import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Injectable()
export class AccountStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(public accountService: AccountService) {
    super({ header: 'Authorization', prefix: 'Bearer ' });
  }
  async validate(apiKey: string) {
    const account = await this.accountService.findOne({ apiKey });

    if (!account) {
      throw new UnauthorizedException(
        'Unauthorized, please make sure you are using a valid API key',
      );
    }

    return account;
  }
}
