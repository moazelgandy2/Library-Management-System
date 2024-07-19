import { Router } from "express";
import { login, newUser } from "./user.controller.js";

const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/register", newUser);
export default UserRouter;
