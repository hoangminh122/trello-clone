import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";
export class UpdateCardDto{

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
    memberJoins: any;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    checklistId: string;

    @ApiPropertyOptional()
    createdDate: Date;

}