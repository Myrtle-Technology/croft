import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { mongoosePagination } from 'mongoose-paginate-ts';
import { Environment } from '../enums/environment.enum';

@Schema({ timestamps: true })
export class Fyle extends Document {
  @ApiProperty()
  @Prop()
  public name: string;

  @ApiProperty()
  @Prop()
  public originalName: string;

  @ApiProperty()
  @Prop()
  public path: string;

  @ApiProperty()
  @Prop()
  public extension: string;

  @ApiProperty()
  @Prop()
  public mimeType: string;

  @ApiProperty()
  @Prop()
  public accountID: string;

  @ApiProperty()
  @Prop({ enum: Environment, default: Environment.development, type: String })
  public environment: Environment;
}

export const FyleSchema = SchemaFactory.createForClass(Fyle);
FyleSchema.plugin(mongoosePagination);
