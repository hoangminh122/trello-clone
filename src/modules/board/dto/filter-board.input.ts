import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ActionPaymentEnum } from 'src/shared/enum/access-modifier.enum';
import { PaginationModel } from 'src/shared/paginate/pagination-model';

export class FilterBoardDto extends PaginationModel {
  
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  readonly isStar:boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isRecently:boolean;

  @ApiPropertyOptional({enum:ActionPaymentEnum})
  @IsOptional()
  @IsString()
  readonly access:ActionPaymentEnum;
 
}
