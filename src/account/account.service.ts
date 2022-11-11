import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { nanoid } from 'nanoid';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Account } from './schemas/account.schema';
import { Document, FilterQuery } from 'mongoose';

@Injectable()
export class AccountService extends SharedService<AccountRepository> {
  constructor(readonly repo: AccountRepository) {
    super(repo);
  }

  public async create(dto: CreateAccountDto) {
    const accountID =
      dto.name.toLowerCase().trim().replace(new RegExp(/\s/g), '-') +
      '' +
      nanoid();
    const apiKey = nanoid() + nanoid() + nanoid();

    const accountDto = {
      name: dto.name,
      accountID: accountID,
      description: dto.description,
      apiKey: apiKey,
    };

    let account:
      | Account
      | (Document<unknown, any, Account> & { _id?: unknown } & Required<{
            _id: unknown;
          }>);
    try {
      account = await this.repo.create(accountDto);
      this.createAccountDirectory(accountDto);
    } catch (error) {
      this.repo.deleteById(account._id);
    }
    return account;
  }

  public async findAll() {
    return this.repo.find();
  }

  public async findById(id: string) {
    return this.repo.findById(id);
  }

  public async findOne(filter: FilterQuery<Account>) {
    return this.repo.find(filter);
  }

  public async update(id: string, dto: UpdateAccountDto) {
    return this.repo.update({ _id: id }, dto);
  }

  public async remove(id: string) {
    return this.repo.delete({ _id: id });
  }

  private createAccountDirectory(
    dto: CreateAccountDto & { accountID: string },
  ): boolean {
    const homeDirectory = os.homedir();

    // We have to create the folder with the project ID because the accountID will never change, but the project name can change
    const projectFolder = path.join(homeDirectory, 'croft', dto.accountID);
    try {
      if (!fs.existsSync(projectFolder)) {
        fs.mkdirSync(projectFolder, { recursive: true });
      } else {
        console.log('Project Folder Exist', projectFolder);
      }
      return true;
    } catch (e) {
      console.error('Failed to create directory', e);
      return false;
    }
  }
}
