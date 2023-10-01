import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"

export class CreateBookDto{
    @IsString()
    @IsNotEmpty()
    title : string

    @IsString()
    @IsNotEmpty()
    description : string 
    
    @IsString()
    @IsNotEmpty()
    author : string 
    
    @IsNumber()
    price : number
    
    @IsEnum(Category)
    category : Category
}




