import { ApiTags, ApiBody, ApiConsumes, ApiBearerAuth } from "@nestjs/swagger";
import { Controller, Post, UseInterceptors, Get, Param, Res, UploadedFiles, UploadedFile, Put, UseGuards } from "@nestjs/common";
import { FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express/multer'
import { UploadService } from "./upload.service";
import { multerOptions } from "./config";

@ApiTags('upload')
@Controller()
export class UploadController {

    constructor(
        private uploadService: UploadService,
    ) { }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', null, multerOptions))
    async uploadFile(@UploadedFiles() file) {
        console.log(file)
        return await this.uploadService.saveFile(file);
    }

    @Put(':id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', null, multerOptions))
    async updateFile(@UploadedFiles() file, @Param('id') id: String) {
        this.uploadService.updateFile(file, id);
    }

    @Get('getUrlFile/:id')
    async getUrlavatar(@Param('id') id: String) {
        return await this.uploadService.getFile(id);
    }

    @Get('getAll')
    async getAllavatar() {
        return await this.uploadService.findAll();
    }

}