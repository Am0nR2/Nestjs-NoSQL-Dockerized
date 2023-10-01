import { Module } from '@nestjs/common';
import {ConfigModule as NestConfigModule} from "@nestjs/config"
import * as Joi from "joi"

@Module({
    imports : [
        NestConfigModule.forRoot({
            envFilePath : ".env",
            isGlobal : true,
            validationSchema : Joi.object({
                MONGO_URI : Joi.string().required(),
                PORT : Joi.number().required()
            })
        })
    ]
})
export class ConfigModule {}
