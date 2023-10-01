import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user-schema';
import mongoose from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dtos';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        private readonly jwtService: JwtService
        ){}

        async register(
            body : CreateUserDto
        ) : Promise<{access_token: string}>{
            body.password = await bcrypt.hash(body.password, 10)
            
            const user =  await this.userModel.create(body)

            const token = await this.jwtService.signAsync({name: user.name, id : user._id})

            return {access_token : token}
        }
        
        async login(
            body : LoginUserDto
        ) : Promise<{access_token : string }>{
                const user = await this.userModel.findOne({email: body.email})
                
                if(!user) throw new BadRequestException("User with that email is not found...")
                
                const isPwMatches = await bcrypt.compare(body.password, user.password)
                
                if(!isPwMatches) throw new UnauthorizedException("Password is incorrect...")
                
                const token = await this.jwtService.signAsync({name: user.name, id : user._id})
        
                return {access_token : token}
        }
}
