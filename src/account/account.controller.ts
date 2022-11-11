import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CroftRequest } from 'src/shared/interfaces/croft-request.interface';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Create an Account' })
  @IsPublic()
  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.accountService.findAll();
  // }

  @ApiOperation({ summary: 'Find my Account' })
  @ApiBearerAuth()
  @Get('me')
  findOne(@Request() request: CroftRequest) {
    return this.accountService.findById(request.user._id);
  }

  @ApiOperation({ summary: 'Update my Account' })
  @ApiBearerAuth()
  @Patch('me')
  update(
    @Request() request: CroftRequest,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(request.user._id, updateAccountDto);
  }

  @ApiOperation({ summary: 'Delete my Account' })
  @ApiBearerAuth()
  @Delete('me')
  remove(@Request() request: CroftRequest) {
    return this.accountService.remove(request.user._id);
  }
}
