import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("register")
    async register(
        @Body() body : CreateUserDto
    ) : Promise<{access_token:string}>{
        return await this.authService.register(body)
    }

    @Post("login")
    async login(
        @Body() body : LoginUserDto
    ) : Promise<{access_token: string}>{
        return this.authService.login(body)
    }
}
