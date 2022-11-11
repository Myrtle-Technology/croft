import { ApiProperty } from '@nestjs/swagger';

export class MultipleFyleUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
