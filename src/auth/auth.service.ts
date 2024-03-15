import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';
import { User } from 'src/modals/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  // register
  async register(registerDto: RegisterAuthDto): Promise<User> {
    console.log("register hit")
    const { email, password, userName } = registerDto;
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException('User Already Exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    return user.save();
  }

  //login
  async login(loginDto: LoginAuthDto): Promise<{ user; token: string }> {
    console.log("Login hit");
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect email or password!');
    }

    const payload = { sub: user._id, usename: user.userName };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  // get all user
  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }
}
