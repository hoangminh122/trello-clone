import { Module } from "@nestjs/common/decorators";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HandleBarService } from "src/shared/services/handlebar.service";
import { DatabaseModule } from "../database/database.module";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";


@Module({
    imports:[
        DatabaseModule,
        ScheduleModule.forRoot()
    ],
    controllers:[MailController],
    providers:[MailService,HandleBarService]
})
export class MailModule {

}