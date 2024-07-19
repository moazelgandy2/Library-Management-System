import { Router } from "express";
import { validateToken } from "../../middleware/validateToken.js";
import { borrowBook, getBorrowings, returnBook } from "./borrowing.controller.js";

export const BorrowingRouter = Router();

BorrowingRouter.get("/", validateToken, getBorrowings);
BorrowingRouter.post("/:id", validateToken, borrowBook);
BorrowingRouter.delete("/:id", validateToken, returnBook);
