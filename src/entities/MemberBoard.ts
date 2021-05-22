import { Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Board } from "./Board";
import { User } from './User';


@Table({tableName:'member_board',timestamps:false})
export class MemberBoard extends Model {
    
    @Column({
        field:'user_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>User)
    userId!:string

    @Column({
        field:'board_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>Board)
    boardId!:string;

   

}