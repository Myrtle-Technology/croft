import { SharedRepository } from 'src/shared/shared.repository';
import { CreateFyleDto } from './dto/create-fyle.dto';
import { UpdateFyleDto } from './dto/update-fyle.dto';
import { Fyle } from './schemas/fyle.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FyleRepository extends SharedRepository<
  Fyle,
  CreateFyleDto,
  UpdateFyleDto
> {
  constructor(@InjectModel(Fyle.name) model: Model<Fyle>) {
    super(model);
  }

  public async bulkCreate(fyleBulkDto: CreateFyleDto[]) {
    const fyles = await this.model.create(fyleBulkDto);
    await this.model.bulkSave(fyles);
    return fyles;
  }
}
