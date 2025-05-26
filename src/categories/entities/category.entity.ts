import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category
{
    @PrimaryGeneratedColumn()
    id: number;

    // Add other properties as needed, e.g.:
    @Column({ type: 'varchar', length: 100 })
    name: string;
}
