import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  updateUser,
  DeletUser,
  createUser,
} from "../controllers/userController.js";
router.get("/", getAllUsers);
router.post("/post", createUser);
router.put("/:id", updateUser);
router.get("/:id", getUserById);
router.delete("/:id", DeletUser);
export default  router ;
