import { Strategy } from 'passport-http-header-strategy';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Injectable()
export class AccountStrategy extends PassportStrategy(Strategy) {
  constructor(public accountService: AccountService) {
    super({
      header: 'Authorization',
      param: 'access_token',
      prefix: 'Bearer ',
    });
  }
  async validate(apiKey: string) {
    console.log('validate', apiKey);
    const account = await this.accountService.findOne({ apiKey });

    if (!account) {
      throw new UnauthorizedException(
        'Unauthorized, please make sure you are using a valid API key',
      );
    }

    return account;
  }
}
