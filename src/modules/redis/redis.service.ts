import { CACHE_MANAGER, Inject, Injectable, Render, Res } from "@nestjs/common";
import { UnitOfWork } from "../database/UnitOfWork";
import { Cache } from 'cache-manager';


@Injectable()
export class RedisCacheService {

    constructor(
        @Inject(UnitOfWork)
        private readonly unitOfWork: UnitOfWork,
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    )
    {}

    async get(key){
       return await this.cache.get(key);
    }

    async set(RedisDto){
        return await this.cache.set(RedisDto.key,RedisDto.value);
    }

}