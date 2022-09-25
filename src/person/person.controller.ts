import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { PersonService } from './person.service';
import { AddPersonDTO } from './personDTO/addPerson-DTO';
import { UpdatePersonDTO } from './personDTO/updatePerson.DTO';

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

    @Patch(':id')
    async updatePerson(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePersonDTO: UpdatePersonDTO
    ): Promise<PersonEntity> {
        return await this.personService.updatePerson(id, updatePersonDTO);
    }

    //!Second way of updating
    @Patch()
    async updatePersonV2(
        @Body() updateObject,
    ): Promise<UpdateResult> {
        const { updateCriteria, updatePersonDTO } = updateObject;
        return await this.personService.updatePersonV2(updateCriteria, updatePersonDTO);
    }

    @Delete(':id')
    async removePerson(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.personService.deletePerson(id);

    }

}
