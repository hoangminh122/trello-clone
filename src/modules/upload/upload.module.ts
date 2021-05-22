import { Module, UploadedFile, forwardRef } from "@nestjs/common";
import { Files } from "src/entities/file";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
    imports: [
      
    ],
    controllers: [UploadController],
    providers: [
        UploadService,
        {
            provide: 'FILE_REPOSITORY',
            useValue: Files
        }
    ],
    exports: [UploadService]
})
export class UploadModule {

}