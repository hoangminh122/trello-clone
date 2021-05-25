import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Render, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MailService } from "./mail.service";
import { Response } from 'express';
import * as uuid from "uuid";
import EmailScheduleDto from "./dto/mail.dto";

@Controller('mail')
@ApiTags('mail')
export class MailController {
    constructor(
        private readonly emailService :MailService
    )
    { }

    // async scheduleEmail(@Body() emailSchedule: EmailScheduleDto){
    //     this.emailSchedulingService.
    // }

    @Post('')
    async sendCodeToMail(@Body() emailDto: EmailScheduleDto){
        const id: string = uuid.v4();
        return await this.emailService.sendMail(emailDto,id);
    }
    
   

}