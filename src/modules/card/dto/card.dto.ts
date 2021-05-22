import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { now } from "sequelize/types/lib/utils";
import { PaginationModel } from '../../../shared/paginate/pagination-model';

export class CardDto {

    @ApiProperty()
    name:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    labelId:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    startDate:Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    dueDate:Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    memberJoins: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    checklistId: string;

    @ApiPropertyOptional()
    createdDate: Date;

}