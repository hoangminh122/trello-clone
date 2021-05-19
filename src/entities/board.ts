import { BelongsTo, BelongsToMany, Column, DataType, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { User } from 'src/entities/User';
import { List } from './List';

@Table({tableName:'board',timestamps:false})
export class Board extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id :string;

    @Column({
        type:DataType.STRING,
    })
    name:string;

    @HasMany(()=> List,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    lists: List[];

    @Column({
        defaultValue:false,
        type:DataType.BOOLEAN,
    })
    isStart:boolean;

    @BelongsTo(()=>User,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    author : User;

}