import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    contactNo!: string

    @Column()
    paymentMethod! : string

    @Column()
    total! : number

    @Column({ type: "jsonb" })
    productDetails: any

    @Column()
    createdBy!: string

    @CreateDateColumn()
    createdAt!: Date;

}