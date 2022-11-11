import { ApiProperty } from '@nestjs/swagger';

export class SingleFyleUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
