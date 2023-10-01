import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
   ADVENTURE = "Adventure",
   HISTORY = "History",
   CRIME = "Crime",
   SCFI = "Scfi" 
}

@Schema({timestamps : true})
export class Book{
    @Prop()
    title : string 

    @Prop()
    description : string 

    @Prop()
    author : string 
    
    @Prop()
    price : number

    @Prop()
    category : Category
}

export const BookSchema = SchemaFactory.createForClass(Book)