import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '../database/database.module';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports : [DatabaseModule,
  DatabaseModule.forFeature([{name: Book.name, schema: BookSchema}])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
