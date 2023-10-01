import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as NestQuery } from "express-serve-static-core"
import { JwtGuard } from '../auth/guard/jwt-guard';
import { currentUser } from '../auth/decorator';
import { User } from '../auth/schemas/user-schema';
import { userFromStrategy } from '../auth/strategies/jwt-strategy';

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
    constructor(
        private readonly bookService : BookService
    ){}
    
    @Get()
    async findAll(
        @currentUser() user : userFromStrategy, 
        @Query() query : NestQuery          
    ) : Promise<Book[]>{
        console.log(user)
        return this.bookService.findAll(query)
    }

    @Get(":id")
    async getOne(
        @Param("id") _id : string
    ) : Promise<Book> {
        return this.bookService.findOneById(_id)
    }

    @Post()
    async create(
        @Body() body : CreateBookDto
    ) : Promise<Book> {
        return this.bookService.createBook(body)
    }

    @Patch(":id")
    async findOneAndUpdate(
        @Param("id") _id : string,
        @Body() body : UpdateBookDto
    ){
        return this.bookService.findOneAndUpdate(_id, body)
    }

    @Delete(":id")
    async findOneAndDelete(
        @Param("id") _id : string 
    ) : Promise<{ msg:string }>{
        return await this.bookService.findOneAndDelete(_id)
    }

    @Delete()
    async deleteAll() : Promise<{msg: string}>{
        return await this.bookService.deleteAll()
    }
 }   
