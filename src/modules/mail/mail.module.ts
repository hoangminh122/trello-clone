import { Module } from "@nestjs/common/decorators";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { DatabaseModule } from "../database/database.module";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";


@Module({
    imports:[
        DatabaseModule,
        ScheduleModule.forRoot()
    ],
    controllers:[MailController],
    providers:[MailService]
})
export class MailModule {

}