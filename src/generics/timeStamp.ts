import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimeStamp {

    @CreateDateColumn(
        { update: false }
    )
    createdAt: Date;
    @UpdateDateColumn(
        { update: false }
    )
    updatedAt: Date;

    @DeleteDateColumn(
        { update: false }
    )
    deletedAt;

}