import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { boardRepository } from "../database/repository.database.provider";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";


@Module({
    imports:[DatabaseModule],
    controllers:[BoardController],
    providers:[BoardService,boardRepository]
})
export class BoardModule {

}