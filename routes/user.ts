import { Router } from "express";
import { getAllUsers, searchUsers } from "../controller/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/search", searchUsers);

export default router;
