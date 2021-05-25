import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt'
import { User } from "src/entities/User";
import { InjectModel } from "@nestjs/sequelize";
import { MailService } from "../mail/mail.service";
import { DATE } from "sequelize/types";
import { LooseObject } from "src/shared/interfaces/loose-object.interface";
import EmailScheduleDto from "../mail/dto/mail.dto";
import { RedisCacheService } from "../redis/redis.service";

@Injectable()
export class UserService {
    private saltRounds = 10;

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private readonly emailService :MailService,
        private readonly redisService :RedisCacheService

    ) { }

    async showAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>();
    }

    async findById(id: string): Promise<User> {
        let user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        return user;
    }

    async sendVerifyMail(id: string){
        let user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        //check is user exist 
        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Can not found user"
            }, HttpStatus.NOT_FOUND)
        }

        if (user.isVerify) {
            throw new HttpException({
                statusCode: HttpStatus.OK,
                message: "User Is Verified !"
            }, HttpStatus.OK)
        }

        // var now = new Date();
        let emailDto :EmailScheduleDto = {
            recipient : user.email,
            subject : "Verify User",
            date : new Date()
        };
        
        return await this.emailService.sendMail(emailDto,user.id);

    }

    async  verifyUser(id: string,code:string): Promise<string> {
        let user = await this.userRepository.findOne({
            where: {
                id
            }
        });

        //check is user exist 
        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Can not found user"
            }, HttpStatus.NOT_FOUND)
        }

        if (user.isVerify) {
            throw new HttpException({
                status: HttpStatus.OK,
                error: "User Is Verified !"
            }, HttpStatus.OK)
        }

        let keyRedis = await this.redisService.get(user.id)
        if(keyRedis != null) 
        {
            if(keyRedis == code){
                user.isVerify = true;
                let userClone = {
                    firstName :user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    isVerify : true
                }
                console.log(user)
                await this.userRepository.update(userClone, { where: { id } });
                return id;
            }
        }

        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: "User Is Not Verified !"
        }, HttpStatus.BAD_REQUEST)
    }

    async findByEmail(email: string): Promise<User> {
        let user = await this.userRepository.findOne({
            where: {
                email
            }
        });
        return user;
    }

    async create(data: UserDTO) {
        data.password = await this.getHash(data.password);
        try{
            const user = await this.userRepository.create(data);
            return user;

        }
       catch(err) {
        throw new HttpException({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: "Error. Please check the importing file : " + err
          }, HttpStatus.NOT_ACCEPTABLE);

       }
    }

    async update(id: string, data: UserDTO) {
        try {
            let todo = await this.userRepository.findOne({
                where: {
                    id
                }
            });
            if (!todo.id) {
                // tslint:disable-next-line:no-console
                // console.error('user doesn\'t exist');
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: "Can not found user"
                }, HttpStatus.NOT_FOUND)
            }
            await this.userRepository.update(data, { where: { id } });
            return await this.userRepository.findOne({
                where: {
                    id
                }
            });
        } catch (e) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'update database error'
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: string) {
        await this.userRepository.destroy({
            where: {
                id
            },
            // force:true
        })
        return { deleted: true };
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }


}