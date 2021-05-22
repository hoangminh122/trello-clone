import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMemberCardDto{

    @ApiProperty()
    @IsString()
    userId:string

    @ApiProperty()
    @IsString()
    cardId:string;

}