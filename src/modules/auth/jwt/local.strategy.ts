
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException, Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email,password);
        
        return user;
    }
}