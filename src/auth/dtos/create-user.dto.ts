import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator"

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name : string 

    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string 
}