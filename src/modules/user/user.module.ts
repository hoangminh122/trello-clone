import { Module } from "@nestjs/common";
import { User } from "src/entities/User";
import { userRepository } from "../database/repository.database.provider";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
    ],
    controllers: [UserController],
    providers: [
            UserService,
            userRepository
        ],
    exports: [UserService]
})
export class UserModule {

}