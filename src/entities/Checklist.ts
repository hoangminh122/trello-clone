import { Column, DataType, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Item } from "./Item";


@Table({tableName:'checklist',timestamps:false})
export class Checklist extends Model {
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

    @HasMany(()=> Item,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    items: Item[];

}