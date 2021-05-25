import { HttpException, HttpStatus, Inject, Injectable, Render, Res } from "@nestjs/common";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { HttpExceptionFilter } from "src/shared/filters/http-exception-filter";
import { UnitOfWork } from "../database/UnitOfWork";
import { EmailScheduleDto } from "./dto/mail.dto";
import { Response } from 'express';
import * as fs from 'fs-extra';
import { HandleBarService } from "src/shared/services/handlebar.service";

@Injectable()
export class MailService {
    private nodemailerTransport : Mail;

    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @Inject(HandleBarService)
        private handleBarService: HandleBarService,
    )
    {
        this.nodemailerTransport = createTransport({
            service:process.env.EMAIL_SERVICE,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }
        });
    }
    
    async sendMail(emailDto: EmailScheduleDto){

        let mailOptions = {
            from: process.env.EMAIL_USER, 
            to: emailDto.recipient,
            subject: emailDto.subject,
            html: await this.export(emailDto.code)
        }
        try {
            await this.nodemailerTransport.sendMail(mailOptions);
        } catch(e){
            throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'Not Send Email !',
                },
                HttpStatus.BAD_REQUEST,
              );
        }
        return mailOptions.to;
       
    }

    // //@Render('index')
    // renderHtml(res:any) {
    //     console.log("sss");
    //     res.render(
    //         'index',
    //         { code: 'Hello world!' }
           
    //     );
    //     console.log("end");
    //     return 'ok';
    // }

    async export(code :string) {
        const dataPrint = {
            code
        };

        const result = {
            fileName: null,
            buffer: null,
        };
        //result['fileName'] = this.getFileName(user);
        const content = await fs.readFileSync('./templates/test.html', 'utf8');
        const template = this.handleBarService.getInstance().compile(content);
        const html = template(dataPrint);
        //get fileName
        return html;
    }

}