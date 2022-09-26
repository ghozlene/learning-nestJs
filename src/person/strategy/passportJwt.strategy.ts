import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from 'src/interfaces/payload-interface';
import { PersonEntity } from '../entities/person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(PersonEntity)
        private personRepository: Repository<PersonEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET'),
        });
    }

    async validate(payload: PayloadInterface) {
        const user = await this.personRepository.findOne({
            where: {
                email: payload.email
            }
        });

        if (user) {
            const { password, salt, ...result } = user;
            return result;
        } else {
            throw new UnauthorizedException();
        }
    }
}