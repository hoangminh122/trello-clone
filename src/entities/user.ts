import { Column, CreatedAt, DataType, DeletedAt, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from "sequelize-typescript";
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
        allowNull: false,
        field: 'first_name'
      })
      firstName: string;
    
      @Column({
        allowNull: false,
        field: 'last_name'
      })
    lastName: string;

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

    @Column({
        allowNull:true,
        defaultValue:false,
        type:DataType.BOOLEAN
    })
    isVerify:boolean;
    
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

    @CreatedAt
    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt: Date;

    @DeletedAt
    @Column({ field: 'daleted_at', type: DataType.DATE })
    public deletedAt: Date;

}