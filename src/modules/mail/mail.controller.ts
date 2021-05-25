import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Render, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MailService } from "./mail.service";
import { EmailScheduleDto } from './dto/mail.dto';
import { Response } from 'express';

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
        
        return await this.emailService.sendMail(emailDto);
    }
    
   

}