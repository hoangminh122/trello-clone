
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export default class EmailSchedulingService {

    @Cron('******')
    log(){
        console.log('Hello !');
    }

}