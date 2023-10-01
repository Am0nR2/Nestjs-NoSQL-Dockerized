import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose, { ObjectId } from 'mongoose';
import { User } from '../schemas/user-schema';
import { InjectModel } from '@nestjs/mongoose';

export interface userFromStrategy {
   name : string 
   email : string 
   _id : string 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService : ConfigService,
    
    @InjectModel(User.name)
    private readonly userModel : mongoose.Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({ id }: any) : Promise<userFromStrategy> {
    const user = await this.userModel.findById(id)
    if(!user) throw new UnauthorizedException("User with that id is not found...")
    return {name : user.name, email : user.email, _id : id} 
  }
}