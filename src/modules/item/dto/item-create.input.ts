import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";
import { colorLableEnum } from "src/shared/enum/label-color.enum";

export class CreateItemDto{

    @ApiPropertyOptional()
    name:string;

    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    dueDate:Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    assign:string;

    @ApiProperty()
    @IsUUID()
    readonly checklistId:string;

    @ApiPropertyOptional()
    createdDate: Date;

}