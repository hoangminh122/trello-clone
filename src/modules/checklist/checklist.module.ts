import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "../database/database.module";
import { checklistRepository } from "../database/repository.database.provider";
import { ChecklistController } from "./checklist.controller";
import { ChecklistService } from "./checklist.service";

@Module({
    imports:[DatabaseModule],
    controllers:[ChecklistController],
    providers:[ChecklistService,checklistRepository]
})
export class ChecklistModule {

}