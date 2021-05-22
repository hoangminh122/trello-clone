import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationModel } from '../../../shared/paginate/pagination-model';

export class LabelDto extends PaginationModel{

    @ApiProperty()
    name:string;

    // @ApiProperty()
    // order:number;

    @ApiPropertyOptional()
    createdDate: Date;

}