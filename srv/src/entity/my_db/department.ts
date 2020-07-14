import { Entity, Tree, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, OneToMany } from "typeorm";

@Entity()
@Tree("closure-table")
export class Department {
    @PrimaryGeneratedColumn()
    id: number = 0;
    @Column()
    name: string = "";
    @TreeChildren()
    children: Department[] | undefined;

    @TreeParent() 
    parent: Department | undefined;

    constructor() {
    }

}