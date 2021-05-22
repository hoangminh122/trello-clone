import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import { itemRepository } from "../database/repository.database.provider";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";


@Module({
    imports:[DatabaseModule],
    controllers:[ItemController],
    providers:[ItemService,itemRepository]
})
export class ItemModule {

}