import { SharedRepository } from 'src/shared/shared.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './schemas/account.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountRepository extends SharedRepository<
  Account,
  CreateAccountDto,
  UpdateAccountDto
> {
  constructor(@InjectModel(Account.name) model: Model<Account>) {
    super(model);
  }
}
