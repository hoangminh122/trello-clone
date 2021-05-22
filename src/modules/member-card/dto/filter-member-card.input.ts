import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationModel } from 'src/shared/paginate/pagination-model';

export class FilterMemberCardDto extends PaginationModel {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name:string;
 
}
