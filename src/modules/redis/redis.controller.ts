import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Render, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RedisDto } from "./dto/redis.dto";
import { RedisCacheService } from "./redis.service";

@Controller('redis')
@ApiTags('redis')
export class RedisCacheController {
    constructor(
        private readonly redisService :RedisCacheService
    )
    { }

    @Post('')
    async setKeyToRedis( @Body() redisDto:RedisDto){
           return await this.redisService.set(redisDto);
    }

    @Get(':key')
    async getKeyToRedis(
        @Param('key') key:string){
           return await this.redisService.get(key);
    }
    
   

}