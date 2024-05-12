import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'src/modals/user.schema';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // signup
  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  // signin
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginAuthDto): Promise<{user,token:string}> {
    return this.authService.login(loginDto);
  }

    // forgot password
    @Post('forgotPassword')
    @HttpCode(200)
    async forgotPassword(@Body() email: ForgotPasswordDto): Promise<any> {
      return this.authService.forgotPassword(email);
    }

  // get all users
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

}
