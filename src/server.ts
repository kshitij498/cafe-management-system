
import app from "./index";
import AppDataSource from "./config/db";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`server running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });