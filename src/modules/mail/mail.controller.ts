import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MailService } from "./mail.service";
import { EmailScheduleDto } from './dto/mail.dto';

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
        let mailOptions = {
            to: emailDto.recipient,
            subject: emailDto.subject,
            text: emailDto.content
        }
        return await this.emailService.sendMail(mailOptions);
    }
    
}