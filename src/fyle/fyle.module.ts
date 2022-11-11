import { Module } from '@nestjs/common';
import { FyleService } from './fyle.service';
import { FyleController } from './fyle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FyleSchema } from './schemas/fyle.schema';
import { MulterModule } from '@nestjs/platform-express';
import { fyleStorageEngine } from './fyle.storage-engine';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fyle', schema: FyleSchema }]),
    MulterModule.register({
      storage: fyleStorageEngine,
    }),
  ],
  controllers: [FyleController],
  providers: [FyleService],
})
export class FyleModule {}
