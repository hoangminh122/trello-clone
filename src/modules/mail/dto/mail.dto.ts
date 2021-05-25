import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailScheduleDto {

    @ApiPropertyOptional()
    @IsEmail()
    recipient: string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    subject:string;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    code :string;

    @ApiPropertyOptional()
    @IsDateString()
    date:string;
}