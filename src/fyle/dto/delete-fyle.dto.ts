import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteFyleDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  fileNames: string[];
}
