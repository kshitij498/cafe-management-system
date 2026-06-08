import { PrimaryGeneratedColumn,Column,Entity, OneToMany } from "typeorm";
import { Product } from "./productEntity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id! : string

    @Column()
    name! : string

    @OneToMany(()=>Product,(product)=>product.category)
    products!:Product[];
}