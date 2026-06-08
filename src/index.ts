import "dotenv/config";
import express, { urlencoded } from "express"
import cors from "cors"
import userRouter from "./routes/userRoute";
import categoryRouter from "./routes/categoryRoutes"
import productRouter from "./routes/productRoutes"
import billRouter from "./routes/billRoutes"
import dashboardRouter from "./routes/dashboardRoutes"

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/user", userRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/bill", billRouter)
app.use("/dashboard", dashboardRouter)

export default app