import { BadRequestException, CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err)
        if(err.kind === "ObjectId") throw new BadRequestException({
          short_msg :"Incorrect type of id please check it...",
          err_kind : err.kind,
          reason : err.reason.toString(),
          statusCode : 400
        })  
        if(err.code === 11000) {
          throw new ForbiddenException({
            msg: "Credentials has already been taken, look below for more information",
            taken: err.keyValue,
            status_code: 403
          })
        } 
        return throwError(()=> err)
      }) 
    );
  }
}
