
import { IsOptional } from 'class-validator';
import { UserRoleEnum } from 'src/enum/userRole.enum';
import { TimeStamp } from 'src/generics/timeStamp';
import { CarEntity } from 'src/user/entities/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';

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
    @IsOptional()
    @Column({
        name: 'username',
        length: 50,
    })
    username: string;


    @Column()
    age: number;
    @Column()
    cin: number;
    @Column()
    job: string;
    @Column()
    path: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    @Column()
    email: string;
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    @OneToMany(
        type => CarEntity,
        (car) => car.persons, {

        nullable: true,
    }
    )

    car: CarEntity[];

}


