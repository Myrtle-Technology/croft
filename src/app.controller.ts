import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FyleService } from './fyle/fyle.service';
import { IsPublic } from './shared/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fyleService: FyleService,
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @IsPublic()
  @Get('/a/:accountID/f/:fileName')
  findOne(
    @Param('accountID') accountID: string,
    @Param('fileName') fileName: string,
  ) {
    return this.fyleService.findOne(accountID, fileName);
  }
}
