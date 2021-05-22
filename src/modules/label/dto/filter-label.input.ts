import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationModel } from 'src/shared/paginate/pagination-model';

export class FilterLabelDto extends PaginationModel {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name:string;
 
}
