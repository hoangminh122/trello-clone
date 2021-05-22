import { Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Card } from 'src/entities/Card';
import { MemberBoard } from "./MemberBoard";

@Table({tableName:'member_card',timestamps:false})
export class MemberCard extends Model {
    
    @Column({
        field:'member_broad_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>MemberBoard)
    userId!:string

    @Column({
        field:'card_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>Card)
    cardId!:string;

}