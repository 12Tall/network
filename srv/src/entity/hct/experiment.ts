import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity("db88_experiment")
export class Experiment {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number = 0;

    @Column({ length: 20 })
    name: string = "";
    @Column({ length: 20 })
    specimen1: string = "";
    @Column({ length: 20 })
    specimen2: string = "";
    @Column({ length: 20 })
    time: string = "";
    @Column({ length: 20 })
    lubricate_condition: string = "";
}