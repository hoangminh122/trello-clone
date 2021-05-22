import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";
import { ActionPaymentEnum } from "src/shared/enum/access-modifier.enum";


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
    visibility:ActionPaymentEnum;
    

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    createdDate: Date;

}