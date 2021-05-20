import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PaginationModel } from 'src/shared/paginate/pagination-model';

export class FilterBoardDto extends PaginationModel {
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly  isStar:boolean;
}
