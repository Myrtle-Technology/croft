import {
  Controller,
  Get,
  Post,
  Param,
  Body,
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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { DeleteFyleDto } from './dto/delete-fyle.dto';
import { SingleFyleUploadDto } from './dto/single-fyle-upload.dto';
import { MultipleFyleUploadDto } from './dto/multiple-fyle-upload.dto';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
export class FyleController {
  constructor(private readonly fyleService: FyleService) {}

  @ApiOperation({ summary: 'Upload a File' })
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to be uploaded',
    type: SingleFyleUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @Request() request: CroftRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fyleService.upload(request, request.user.accountID, file);
  }

  @ApiOperation({ summary: 'Upload multiple files' })
  @Post('/upload-multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to be uploaded',
    type: MultipleFyleUploadDto,
  })
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

  @ApiOperation({ summary: 'Find all files' })
  @Get()
  findAll(@Request() request: CroftRequest) {
    return this.fyleService.findAll(request.user.accountID);
  }

  @ApiOperation({ summary: 'Delete a file' })
  @Delete(':fileName')
  remove(
    @Request() request: CroftRequest,
    @Param('fileName') fileName: string,
  ) {
    return this.fyleService.delete(request.user.accountID, fileName);
  }

  @ApiOperation({ summary: 'Delete many files' })
  @Delete()
  removeMany(@Request() request: CroftRequest, @Body() dto: DeleteFyleDto) {
    return this.fyleService.deleteMany(request.user.accountID, dto.fileNames);
  }
}
