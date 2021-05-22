import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { User } from "./User";
import { Board } from './Board';
import { Card } from './Card';

@Table({tableName:'list',timestamps:false})
export class List extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id:string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    name:string;

    @ForeignKey(() => User)
    @Column({
        field: 'user_id',
        type: DataType.UUID,
    })
    authorId!: string;
    
    @ForeignKey(() => Board)
    @Column({
        field: 'board_id',
        type: DataType.UUID,
    })
    boardId!: string;
    
    @BelongsTo(()=>User,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    author : User;

    @BelongsTo(()=>Board,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    board : Board;

    @HasMany(()=> Card,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    cards:Card[];

    
}