import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
export class CreateCardDto{

    @ApiProperty()
    name:string;

    @ApiProperty()
    @IsUUID()
    listId: string;

    // @ApiProperty()
    // order:number;

    @ApiPropertyOptional()
    createdDate: Date;

}