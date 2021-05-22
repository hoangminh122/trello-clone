import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import {cardRepository, checklistRepository, labelRepository, memberBoardRepository, memberCardRepository } from "../database/repository.database.provider";
import { MemberCardModule } from "../member-card/member-card.module";
import { MemberCardService } from "../member-card/member-card.service";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";


@Module({
    imports:[
        DatabaseModule,
        MemberCardModule
    ],
    controllers:[CardController],
    providers:[
        CardService,
        cardRepository,
        labelRepository,
        checklistRepository,
        memberBoardRepository,
        memberCardRepository,
        MemberCardService
    ]
})
export class CardModule {

}