import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { CreateBookDto } from './dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query } from "express-serve-static-core"

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel : mongoose.Model<Book>
    ){}

    async findAll(
        query : Query 
    ) : Promise<Book[]>{

        const currentPage = query.page || 1
        const limit = Number(query.limit) || 5
        const skip = (Number(currentPage) - 1) * Number(limit)
        console.log(query)
        const title = query.title ?  {
        title : { 
            $regex : query.title,
            $options : "i"
        }
        } : {}

        return await this.bookModel.find({...title}).limit(limit).skip(skip)
    }

    async findOneById(
        _id : string 
    ) : Promise<Book> {
        const book =  await this.bookModel.findOne({ _id })
        if(!book) {
            throw new NotFoundException("Book is not found...")
        }
        return book
    }

    async createBook(
        body : CreateBookDto
    ) : Promise<Book> {
        return await this.bookModel.create(body)
    }

    async findOneAndUpdate(
        _id: string, 
        body: UpdateBookDto
    ) : Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(_id, body, {
            new : true,
            runValidators : true
        })
    }

    async findOneAndDelete(
        _id : string 
    ) : Promise<{msg: string }>{
        await this.bookModel.findByIdAndDelete(_id)
        return {msg: "Book has been successfully deleted..."}
    }

    async deleteAll() : Promise<{msg: string}>{
        await this.bookModel.deleteMany()
        return {msg : "All books has been successfully deleted..."}
    }
}
