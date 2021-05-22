import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { boardRepository, listRepository } from "../database/repository.database.provider";
import { ListCardController } from "./list.controller";
import { ListCardService } from "./list.service";


@Module({
    imports:[DatabaseModule],
    controllers:[ListCardController],
    providers:[ListCardService,listRepository]
})
export class ListCardModule {

}