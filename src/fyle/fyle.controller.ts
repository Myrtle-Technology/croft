import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Request,
} from '@nestjs/common';
import { FyleService } from './fyle.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CroftRequest } from 'src/shared/interfaces/croft-request.interface';

@Controller('files')
export class FyleController {
  constructor(private readonly fyleService: FyleService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Request() request: CroftRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fyleService.upload(request, request.user.accountID, file);
  }

  @Post('/upload-multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(
    @Request() request: CroftRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.fyleService.uploadMultiple(
      request,
      request.user.accountID,
      files,
    );
  }

  @Get()
  findAll(@Request() request: CroftRequest) {
    return this.fyleService.findAll(request.user.accountID);
  }

  @Delete(':id')
  remove(@Request() request: CroftRequest, @Param('id') id: string) {
    return this.fyleService.delete(request.user.accountID, id);
  }
}
