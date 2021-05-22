import { Column, DataType, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Board } from './Board';
import { Card } from "./Card";
import { List } from "./List";
import { Comment } from './comment';


@Table({tableName:'user',timestamps:false})
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id!:string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    email:string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    username: string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    password:string;
    
    //role:string;

    @HasMany(()=> Board,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    boards:Board[];

    @HasMany(()=> Card,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    cards:Card[];

    @HasMany(()=> List,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    lists:List[];

    @HasMany(()=> Comment,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    comment:Comment[];

    //stars

}