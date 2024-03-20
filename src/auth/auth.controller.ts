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
import { UsersService } from 'src/users/user.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enums';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}
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

    @Roles(Role.Member, Role.Superadmin, Role.Admin)
    @Get('profile')
    async getProfile(@Request() req) {
        try {
            const user = req.user;
            return await this.userService.findOne(user.id, user.role);
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
}
