import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SharedService } from 'src/shared/shared.service';
import { FyleRepository } from './fyle.repository';
import { unlinkSync, writeFileSync } from 'fs';
import os from 'os';
import path, { extname, join } from 'path';
import { Environment } from './enums/environment.enum';
import { Base64FyleUploadDto } from './dto/base64-fyle-upload.dto';
import { CreateFyleDto } from './dto/create-fyle.dto';

@Injectable()
export class FyleService extends SharedService<FyleRepository> {
  constructor(readonly repo: FyleRepository) {
    super(repo);
  }

  public async upload(
    request: Request,
    accountID: string,
    file: Express.Multer.File,
  ) {
    const fyleDto = this.buildImageResponse(request, accountID, file);

    // Save to the database
    try {
      return this.repo.create(fyleDto);
    } catch (e) {
      unlinkSync(file.path);
      throw new Error(e.toString());
    }
  }

  public async uploadMultiple(
    request: Request,
    accountID: string,
    files: Array<Express.Multer.File>,
  ) {
    const fyleBulkDto = files.map((file) => {
      return this.buildImageResponse(request, accountID, file);
    });

    return this.repo.bulkCreate(fyleBulkDto);
  }

  public buildImageResponse(
    request: Request,
    accountID: string,
    file: Express.Multer.File,
  ) {
    const fileUrl = this.getFileLink(request, accountID, file.filename);

    return {
      name: file.filename,
      originalName: file.originalname,
      path: file.path,
      extension: extname(file.filename),
      url: fileUrl,
      mimeType: file.mimetype,
      accountID,
      environment:
        request.headers['x-environment'] ||
        process.env.NODE_ENV ||
        Environment.development,
    } as CreateFyleDto;
  }

  public getFileLink(request: Request, accountID: string, filename: string) {
    return `https://${request.get('host')}/a/${accountID}/f/${filename}`;
  }

  public async uploadBase64Files(
    request: Request,
    accountID: string,
    files: Array<Base64FyleUploadDto>,
  ) {
    const uploadPath = join(os.homedir(), 'croft', accountID);
    const fyleBulkDto: CreateFyleDto[] = [];
    files.forEach((file) => {
      const fileName =
        Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.name);
      const finalUploadPath = `${uploadPath}/${fileName}`;
      writeFileSync(finalUploadPath, file.file, { encoding: 'base64' });
      const fyleDto: CreateFyleDto = {
        name: fileName,
        originalName: file.name.split('.')[0],
        path: finalUploadPath,
        extension: extname(file.name),
        url: this.getFileLink(request, accountID, fileName),
        mimeType: file.type,
        accountID,
        environment:
          request.headers['x-environment'] ||
          process.env.NODE_ENV ||
          Environment.development,
      };
      fyleBulkDto.push(fyleDto);
    });
    return this.repo.bulkCreate(fyleBulkDto);
  }

  public async findAll(accountID: string) {
    return this.repo.paginate({ query: { accountID } });
  }

  public async findOne(accountID: string, fyleName: string) {
    return this.repo.findOne({ name: fyleName, accountID });
  }

  public async delete(accountID: string, fyleName: string) {
    const fyle = await this.repo.findOne({
      name: fyleName,
      accountID,
    });

    if (!fyle) {
      return false;
    }

    unlinkSync(fyle.path);

    return this.repo.delete({ _id: fyle, accountID });
  }

  public async deleteMany(accountID: string, fyleNames: string[]) {
    if (fyleNames.length === 0) {
      return false;
    }

    const fyles = await this.repo.find({
      name: { $in: fyleNames },
      accountID,
    });

    if (fyles.length === 0) {
      return false;
    }

    Promise.all(
      fyles.map((fyle) => {
        if (fyle) unlinkSync(fyle.path);
      }),
    );

    return this.repo.delete({
      name: { $in: fyleNames },
      accountID,
    });
  }
}
