import { UUID, UUIDV4 } from "sequelize";
import { Column, CreatedAt, DataType, DeletedAt, IsUUID, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName:'file',
    timestamps:false
})
export class Files extends Model {

    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.STRING(50),
        defaultValue:UUIDV4
    })
    id?:string;

    @Column({
        allowNull:true,
        type:DataType.STRING(255)
    })
    originalName:string;

    @Column({
        allowNull:true,
        type:DataType.STRING(255)
    })
    fileName:string;

    @Column({
        allowNull:true,
        type:DataType.INTEGER
    })
    size:bigint

    @Column({
        field: 'created_at',
        allowNull: true,
        type: DataType.DATE,
        defaultValue: new Date(),
    })
    @CreatedAt
    createdAt?: Date;
    
    @UpdatedAt
    @Column({
    field: 'updated_at',
    allowNull: true,
    type: DataType.DATE,
    defaultValue: new Date(),
    })
    updatedAt?: Date;

    @DeletedAt
    @Column({ field: 'deleted_at', allowNull: true, type: DataType.DATE })
    deletedAt?: Date;

}