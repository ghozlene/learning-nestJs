import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonEntity } from './entities/person.entity';
import { PersonService } from './person.service';
import { AddPersonDTO } from './personDTO/addPerson-DTO';

@Controller('person')
export class PersonController {
    constructor(private personService: PersonService) {

    }
    @Get()
    async getAllPersons(): Promise<PersonEntity[]> {
        return await this.personService.getPersons();
    }

    @Post()
    async addPerson(
        @Body() addPersonDTO: AddPersonDTO
    ): Promise<PersonEntity> {
        return await this.personService.addPerson(addPersonDTO);
    }



}
