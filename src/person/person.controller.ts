import { Controller, Get } from '@nestjs/common';
import { PersonEntity } from './entities/person.entity';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
    constructor(private personService: PersonService) {

    }
    @Get()
    async getAllPersons(): Promise<PersonEntity[]> {
        return await this.personService.getPersons();
    }


    1;
}
