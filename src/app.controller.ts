import { Controller, Get, Param, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { FyleService } from './fyle/fyle.service';
import { IsPublic } from './shared/decorators/is-public.decorator';
import { Response as EResponse } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fyleService: FyleService,
  ) {}

  @IsPublic()
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('/a/:accountID/f/:fileName')
  public async findOne(
    @Param('accountID') accountID: string,
    @Param('fileName') fileName: string,
    @Response() res: EResponse,
  ) {
    const fyle = await this.fyleService.findOne(accountID, fileName);
    return res.sendFile(fyle.path);
  }
}
