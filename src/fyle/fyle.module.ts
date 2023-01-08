import { Module } from '@nestjs/common';
import { FyleService } from './fyle.service';
import { FyleController } from './fyle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FyleSchema } from './schemas/fyle.schema';
import { MulterModule } from '@nestjs/platform-express';
import { fyleStorageEngine } from './fyle.storage-engine';
import { FyleRepository } from './fyle.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fyle', schema: FyleSchema }]),
    MulterModule.register({
      storage: fyleStorageEngine,
      limits: { fileSize: Infinity }, // 1GB
    }),
  ],
  controllers: [FyleController],
  providers: [FyleService, FyleRepository],
  exports: [FyleService, FyleRepository],
})
export class FyleModule {}
