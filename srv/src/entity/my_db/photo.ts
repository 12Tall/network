import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Photo {
    @PrimaryGeneratedColumn()
    id: number = 0;
    @Column({ length: 100 })
    name: string = "";
    @Column()
    description: string = "";
    @Column()
    filename: string = "";
    @Column("double")
    views: number = 0;
    @Column()
    isPublished: boolean = false;

}