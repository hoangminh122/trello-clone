import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";


export class CreateBoardDto {
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    bgUrl :string;

    @ApiProperty()
    name:string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    isStar:boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    private:string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    createdDate: Date;

}