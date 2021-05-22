import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import { memberCardRepository } from "../database/repository.database.provider";
import { MemberCardController } from "./member-card.controller";
import { MemberCardService } from "./member-card.service";

@Module({
    imports:[DatabaseModule],
    controllers:[MemberCardController],
    providers:[MemberCardService,memberCardRepository],
    exports:[MemberCardModule]
})
export class MemberCardModule {

}