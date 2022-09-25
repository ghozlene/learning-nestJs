import { TimeStamp } from 'src/generics/timeStamp';
import { CarEntity } from 'src/user/entities/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, } from 'typeorm';

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

    @OneToMany(
        type => CarEntity,
        (car) => car.persons, {

        nullable: true,

    }
    )
    car: CarEntity[];

}


