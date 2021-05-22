import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ActionPaymentEnum } from 'src/shared/enum/access-modifier.enum';
import { PaginationModel } from 'src/shared/paginate/pagination-model';

export class FilterListDto extends PaginationModel {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name:string;
 
}
