import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { now } from "sequelize/types/lib/utils";

export class CreateBoardDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    url :string;

    @ApiProperty()
    name:string;

    @ApiPropertyOptional()
    isStar:boolean;

    @ApiPropertyOptional()
    createdDate: Date;

}