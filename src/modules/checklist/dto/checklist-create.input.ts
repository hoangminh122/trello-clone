import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { colorLableEnum } from "src/shared/enum/label-color.enum";

export class CreateChecklistDto{

    @ApiPropertyOptional()
    name:string;

    // @ApiProperty()
    // order:number;

    @ApiPropertyOptional()
    createdDate: Date;

}