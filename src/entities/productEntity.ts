import { PrimaryGeneratedColumn,Column,Entity,OneToMany,ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./categoryEntity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId! : string

    @Column({length:255})
    name! : string

    @Column({length:255})
    description! : string

    @Column()
    price! : number

    @Column()
    status! : string

    @ManyToOne(()=>Category,(category)=>category.products,{nullable:false})
    @JoinColumn({name:"categoryId"})
    category! : Category
    
}