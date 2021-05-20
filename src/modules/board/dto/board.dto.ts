import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { now } from "sequelize/types/lib/utils";
import { PaginationModel } from './../../../shared/paginate/pagination-model';

export class CreateBoardDto extends PaginationModel{
    @ApiProperty()
    @IsString()
    @IsOptional()
    url :string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    order:number;

    @ApiPropertyOptional()
    isStar:boolean;

    @ApiPropertyOptional()
    createdDate: Date;

}