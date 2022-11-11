import { Request } from 'express';
import { Account } from 'src/account/schemas/account.schema';

export interface CroftRequest extends Request {
  user: Account;
}
