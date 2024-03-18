import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Request,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './auth.metadata';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
        try {
            return this.authService.signIn(signInDto.email, signInDto.password);
        } catch (error) {
            throw error;
        }
    }

    @Get('extend-access-token')
    async extendAccessToken(@Req() req) {
        const user = req.user;
        const { access_token, exp } = await this.authService.createToken(
            user.id,
            user.username,
            user.role,
        );

        // black list old token
        const token = req.headers.authorization.split(' ')[1];
        this.authService.addBlackListToken(token);

        return { access_token, exp };
    }

    @Delete('logout')
    @HttpCode(204)
    logOut(@Req() req) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            this.authService.addBlackListToken(token);
        } catch (error) {
            throw error;
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
