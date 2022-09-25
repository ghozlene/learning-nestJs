import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { AddPersonDTO } from './personDTO/addPerson-DTO';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(PersonEntity)
        private personRepository: Repository<PersonEntity>) {
    }
    async getPersons(): Promise<PersonEntity[]> {
        return await this.personRepository.find();
    }

    async addPerson(person: AddPersonDTO): Promise<PersonEntity> {
        return await this.personRepository.save(person);
    }
}
