import express from "express";
import db from "./db/connect.js";

import UserRouter from "./src/modules/user/user.routes.js";
import BookRouter from "./src/modules/book/book.routes.js";
import { BorrowingRouter } from "./src/modules/borrwings/borrwing.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

db();

app.use("/users", UserRouter);
app.use("/books", BookRouter);
app.use("/borrowings", BorrowingRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
