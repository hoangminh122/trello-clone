import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import {cardRepository } from "../database/repository.database.provider";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";


@Module({
    imports:[DatabaseModule],
    controllers:[CardController],
    providers:[CardService,cardRepository]
})
export class CardModule {

}