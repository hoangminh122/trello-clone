import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { HttpExceptionFilter } from "src/shared/filters/http-exception-filter";
import { UnitOfWork } from "../database/UnitOfWork";

@Injectable()
export class MailService {
    private nodemailerTransport : Mail;

    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
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
    
    async sendMail(options: Mail.Options){
        try {
            await this.nodemailerTransport.sendMail(options);
        } catch(e){
            throw new HttpException(
                {
                  statusCode: HttpStatus.BAD_REQUEST,
                  message: 'Not Send Email !',
                },
                HttpStatus.BAD_REQUEST,
              );
        }
        return options.to;
    }

}