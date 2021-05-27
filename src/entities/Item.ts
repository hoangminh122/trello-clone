import { Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Checklist } from "./checklist";


@Table({tableName:'item',timestamps:false})
export class Item extends Model {
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
        allowNull:true,
        type:DataType.STRING,
    })
    assign:string;

    @Column({
        allowNull:true,
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    isCompleted:boolean;

    @Column({
        allowNull:true,
        type:DataType.DATE,
    })
    dueDate:Date;

    @ForeignKey(() => Checklist)
    @Column({
        field: 'checklist_id',
        type: DataType.UUID,
    })
    checklistId!: string;


}