import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { AddPersonDTO } from './personDTO/addPerson-DTO';
import { UpdatePersonDTO } from './personDTO/updatePerson.DTO';

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
        const personRemoved = await this.personRepository.findOneBy({ id });

        if (personRemoved)
            //Delete the person
            return this.personRepository.remove(personRemoved);

        throw new NotFoundException('Person doesn\'t exsit ');
    }

    //!second method with delete
    async deletePerson(id: number) {

        return await this.personRepository.delete([4, 5, 6, 7]);


    }

}

