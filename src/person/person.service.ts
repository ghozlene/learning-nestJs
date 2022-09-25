import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { AddPersonDTO } from './personDTO/addPerson-DTO';
import { UserSubscribeDTO } from './personDTO/user-subscribe.DTO';
import * as bcrypt from 'bcrypt';
import { UpdatePersonDTO } from './personDTO/updatePerson.DTO';
import * as colors from 'colors';
import { LoginCreadentialsDTO } from './personDTO/login-Credentialis.DTO';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(PersonEntity)
        private personRepository: Repository<PersonEntity>,
        private jwtService: JwtService
    ) {
    }

    async findById(id: number) {
        const personRemoved = await this.personRepository.findOneBy({ id });

        if (!personRemoved) {

            throw new NotFoundException('Person doesn\'t exsit ');
        }
        return personRemoved;
    }

    async getPersons(): Promise<PersonEntity[]> {
        return await this.personRepository.find();
    }

    async addPerson(person: AddPersonDTO): Promise<PersonEntity> {
        return await this.personRepository.save(person);
    }

    async updatePerson(id: number, person: UpdatePersonDTO): Promise<PersonEntity> {

        //getting the person who has the id and replace the old values with
        //value of the method parameter
        const newPerson = await this.personRepository.preload({ id, ...person });
        //testing if the person exsit or not
        if (newPerson)
            //save the new person
            return await this.personRepository.save(newPerson);

        throw new NotFoundException('Person doesn\'t exsit ');
    }

    //!second way of updating
    updatePersonV2(updateCriteria, personUpdate: UpdatePersonDTO) {
        return this.personRepository.update(updateCriteria, personUpdate);
    }

    async removePerson(id: number) {
        const personRemoved = await this.findById(id);
        //Delete the person
        return await this.personRepository.remove(personRemoved);
    }

    async softDeletePerson(id: number) {

        //Delete the person
        return await this.personRepository.softDelete(id);

    }
    //!second method with delete
    async deletePerson(id: number) {

        return await this.personRepository.delete([4, 5, 6, 7]);


    }
    async restorePerson(id: number) {

        return this.personRepository.restore(id);
    }

    async statPersonNumberByAge(maxAge: Number, minAge = 0) {
        //creating a queryBuilder
        const queryBuilder = this.personRepository.createQueryBuilder('person');
        //searching the number of person by Age
        await queryBuilder
            .select("person.age,count(person.id) as Total_Persons")
            .where('person.age > :minAge and person.age < :maxAge')
            .setParameters({ minAge, maxAge })
            .groupBy('person.age');

        console.log(colors.yellow(queryBuilder.getSql()));

        return queryBuilder.getRawMany();


    }

    async register(userData: UserSubscribeDTO): Promise<Partial<PersonEntity>> {
        const user = this.personRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
            await this.personRepository.save(user);
        } catch (e) {
            throw new ConflictException('check your password or email ', e);
        }

        return { id: user.id, email: user.email, password: user.password };

    }

    async login(credentials: LoginCreadentialsDTO) {
        //getting the email and password
        const { email, password } = credentials;

        //getting the user
        const user = await this.personRepository.createQueryBuilder('person')
            .where("person.email = :email",
                { email })
            .getOne();

        //check if user exist
        if (!user) {
            throw new NotFoundException('user not found... check credenials');
        }
        //compare password with the password on the DB
        const hashedPassword = await bcrypt.hash(password, user.salt);

        if (hashedPassword === user.password) {
            const payload = {
                email: user.email,
                role: user.role
            };
            const jwt = await this.jwtService.sign(payload);

            return {
                "access_token": jwt
            };

        } else {
            throw new NotFoundException('user not found... check credenials');
        }
    }

}

