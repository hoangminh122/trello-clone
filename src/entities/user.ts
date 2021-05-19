import { Model, Table } from "sequelize-typescript";


@Table({tableName:'user',timestamps:false})
export class User extends Model {

}