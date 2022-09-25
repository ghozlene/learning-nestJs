import { TimeStamp } from 'src/generics/timeStamp';
import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity('person')
export class PersonEntity extends TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        name: 'name',
        length: 50,
    })
    name: string;
    @Column({
        name: 'firstName',
        length: 50,
    })
    firstName: string;
    @Column()
    age: number;
    @Column()
    cin: number;
    @Column()
    job: string;
    @Column()
    path: string;


}


