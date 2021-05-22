import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MemberCardDto {

    @ApiProperty()
    @IsString()
    userId:string

    @ApiProperty()
    @IsString()
    cardId:string;

}