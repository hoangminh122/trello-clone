import { Column, DataType, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { colorLableEnum } from "src/shared/enum/label-color.enum";


@Table({tableName:'label',timestamps:false})
export class Label extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id:string;

    @Column({
        type:DataType.STRING,
    })
    name:string;

    @Column({
        type:DataType.STRING,
        defaultValue:colorLableEnum.BLUE
    })
    color:colorLableEnum;

}