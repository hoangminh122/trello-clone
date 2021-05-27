import { Column, DataType, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";


@Table({tableName:'activity',timestamps:false})
export class Activity extends Model {
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

}