import { PartialType } from '@nestjs/mapped-types';
import { CreateFyleDto } from './create-fyle.dto';

export class UpdateFyleDto extends PartialType(CreateFyleDto) {}
