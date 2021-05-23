import { Injectable} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { result } from "lodash";

@Injectable()
export class AuthService {
    private saltRounds = 10;
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        let comparePassword = null;
        const user = await this.usersService.findByEmail(email);
        if(user !== null){
            comparePassword = await this.comparePassword(password, user.password);
        }
        if (comparePassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userObj: any) {
        let result =null;
        let user = await userObj;
        const payload = { email:user.email,UserId:user.id };
        result =  {
            access_token: await this.jwtService.sign(payload)
        }
        return result;
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(attempt: string | undefined, passwordHash: string | undefined): Promise<boolean> {
        let result = await bcrypt.compare(attempt, passwordHash);
        return result;
    }


}