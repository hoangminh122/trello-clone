import { Controller,Post, ValidationPipe, Body, UnauthorizedException } from "@nestjs/common";
import { ApiTags, ApiResponse} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./jwt/local.strategy";
import { AuthDTO } from "./dto/auth.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private localStrategy: LocalStrategy) {
    }
    //    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiResponse({ status: 200, description: 'Create new user success !.' })
    // @ApiBody({ type: [UserEntity] })
    async login(@Body(new ValidationPipe()) req: AuthDTO) {
        let result = null;
        const user = await this.localStrategy.validate(req.email, req.password);
        if(user != null){
            result= await this.authService.login(user);
            return result;
        }
        return new UnauthorizedException;
        // res.status(200).send("UnauthorizedException");
        // throw new UnauthorizedException();
    }

}