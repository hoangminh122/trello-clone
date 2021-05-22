import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { colorLableEnum } from "src/shared/enum/label-color.enum";

export class CreateLabelDto{

    @ApiPropertyOptional()
    name:string;

    @ApiProperty({enum:colorLableEnum})
    @IsOptional()
    @IsString()
    readonly color:colorLableEnum;

    // @ApiProperty()
    // order:number;

    @ApiPropertyOptional()
    createdDate: Date;

}