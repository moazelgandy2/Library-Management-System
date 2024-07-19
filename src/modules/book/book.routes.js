import { Router } from "express";

import { deleteBook, getBooks, newBook, searchBook, updateBook } from "./book.controller.js";
import { validateToken } from "../../middleware/validateToken.js";
import { validateRole } from "../../middleware/validateRole.js";

const BookRouter = Router();

BookRouter.get("/", getBooks);
BookRouter.get("/search", searchBook);
BookRouter.post("/", validateToken, validateRole, newBook);
BookRouter.put("/:id", validateToken, validateRole, updateBook);
BookRouter.delete("/:id", validateToken, validateRole, deleteBook);

export default BookRouter;
