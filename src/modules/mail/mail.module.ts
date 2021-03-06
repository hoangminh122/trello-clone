import { CacheModule } from "@nestjs/common";
import { Module } from "@nestjs/common/decorators";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HandleBarService } from "src/shared/services/handlebar.service";
import { DatabaseModule } from "../database/database.module";
import { RedisCacheModule } from "../redis/redis.module";
import { RedisCacheService } from "../redis/redis.service";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports:[
        DatabaseModule,
        ScheduleModule.forRoot(),
        RedisCacheModule,
        CacheModule.registerAsync({
            imports:[],
            inject:[],
            useFactory: async (configService : ConfigService) => ({
                store: redisStore,
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                ttl: process.env.CACHE_TTL
            })
        })
    ],
    controllers:[MailController],
    providers:[
        MailService,
        HandleBarService,
        RedisCacheService
    ],
    exports:[MailModule]
})
export class MailModule {

}