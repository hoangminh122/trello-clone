import { CacheModule } from "@nestjs/common";
import { Module } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { HandleBarService } from "src/shared/services/handlebar.service";
import { DatabaseModule } from "../database/database.module";
import { RedisCacheController } from "./redis.controller";
import { RedisCacheService } from "./redis.service";
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports:[
        DatabaseModule,
        ScheduleModule.forRoot(),
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
    controllers:[RedisCacheController],
    providers:[RedisCacheService],
    exports:[RedisCacheModule]
})
export class RedisCacheModule {

}