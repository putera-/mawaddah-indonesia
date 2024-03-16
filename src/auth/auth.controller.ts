import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
        try {
            return this.authService.signIn(signInDto.email, signInDto.password);
        } catch (error) {
            throw error;
        }
    }
}
