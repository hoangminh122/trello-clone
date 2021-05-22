import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import { labelRepository } from "../database/repository.database.provider";
import { LabelController } from "./label.controller";
import {LabelService } from "./label.service";


@Module({
    imports:[DatabaseModule],
    controllers:[LabelController],
    providers:[LabelService,labelRepository]
})
export class LabelModule {

}