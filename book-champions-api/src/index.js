import express from "express";
import {PORT} from "./config.js"
import { sequelize } from "./db/db.js";
import bookRoutes from "./routes/book.routes.js"
import "./models/Books.js"

const app = express();


try{
    app.listen(PORT);
    app.use(express.json());
    app.use(bookRoutes);
    await sequelize.sync();
    console.log(`Server listening on port ${PORT}`);

} catch (error) {
    console.log(`There was an error on initialization`);
}



