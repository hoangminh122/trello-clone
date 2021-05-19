import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { List } from "./List";
import { Comment } from './comment';
import { User } from "./User";


@Table({tableName:'card',timestamps:false})
export class Card extends Model {
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

    @ForeignKey(() => User)
    @Column({
        field: 'user_id',
        type: DataType.UUID,
    })
    authorId!: string;
    
    @Column({
        type:DataType.STRING,
    })
    description :string;

    @BelongsTo(()=>User,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    author : User;

    @ForeignKey(() => List)
    @Column({
        field: 'list_id',
        type: DataType.UUID,
    })
    listId!: string;

    @HasMany(()=> Comment,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    comments: Comment[];

}