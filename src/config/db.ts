import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../entities/userEntity";
import { Category } from "../entities/categoryEntity";
import { Product } from "../entities/productEntity";
import { Bill } from "../entities/billEntity";


const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,

  entities: [User,Category,Product,Bill],
  migrations: ["src/migrations/*.ts"]
}) 

export default AppDataSource