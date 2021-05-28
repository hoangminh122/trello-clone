import { BelongsTo, Column, DataType, ForeignKey, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Card } from "./Card";
import { User } from "./User";


@Table({tableName:'comment',timestamps:false})
export class Comment extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id!:string;

    @Column({
        type:DataType.STRING,
    })
    comment:string;

    @ForeignKey(() => User)
    @Column({
        field: 'user_id',
        type: DataType.UUID,
    })
    authorId!: string;
    
    @BelongsTo(()=>User,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    author : User;
    
    @ForeignKey(() => Card)
    @Column({
        field: 'list_id',
        type: DataType.UUID,
    })
    cardId!: string;
}