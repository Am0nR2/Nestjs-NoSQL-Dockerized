import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"

export class UpdateBookDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title ?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description ?: string 
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    author ?: string 
    
    @IsOptional()
    @IsNumber()
    price ?: number
    
    @IsOptional()
    @IsEnum(Category)
    category ?: Category
}