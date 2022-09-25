import { TimeStamp } from "src/generics/timeStamp";
import { PersonEntity } from "src/person/entities/person.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('car')
export class CarEntity extends TimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    model: string;

    @Column({ length: 50, unique: true })
    type: string;

    @ManyToOne(
        type => PersonEntity,
        (person) => person.car, {
        cascade: ['update', 'remove'],
        nullable: true,

    }
    )
    persons: PersonEntity;
}
