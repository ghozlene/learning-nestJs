import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passportJwt.strategy';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([PersonEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.SECRET
    })
  ],
  controllers: [PersonController],
  providers: [PersonService, JwtStrategy]
})
export class PersonModule { }
