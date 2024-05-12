import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login.dto';
import { User } from 'src/modals/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import * as nodemailer from 'nodemailer'

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

   //forgot password
   async forgotPassword(forgotDto: ForgotPasswordDto): Promise<any> {
      const {email}=forgotDto;
      const userEmail=email;
      function generateTemporaryPassword() {
        const length = 6;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let temporaryPassword = '';

        for (let i = 0; i < length; i++) {
            temporaryPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return temporaryPassword;
    }

    // Function to send the temporary password via email
    function sendTemporaryPassword(userEmail, temporaryPassword) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'no.reply.autonova@gmail.com',
              pass: 'nshvwlucfrkxidgw'//'wrpapmioxmvsoyvb' 
            }
        });

        const mailOptions = {
            from: 'no.reply.autonova@gmail.com',
            to: userEmail,
            subject: 'Temporary Password for Login',
            text: `Your temporary password is: ${temporaryPassword}. Please use this to log in and reset your password.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new BadRequestException('Error while sending email')
            } else {
                return "Email Sent!"
            }
        });
    }

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User Not Exist!');
    }
    // Generate a temporary password and send it via email
    const temporaryPassword = generateTemporaryPassword(); // Generate a temporary password
    const salt = await bcrypt.genSalt(10)
   const hashedPassword= await bcrypt.hash(temporaryPassword, salt); // Hash the temporary password

    // Store or update the hashed temporary password in your database for the user
    // Example:
   sendTemporaryPassword(userEmail, temporaryPassword);
   await this.userModel.findOneAndUpdate({ email: userEmail }, { $set: { password: hashedPassword} });
  }

  // get all user
  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }
}
