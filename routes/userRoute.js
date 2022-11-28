import  express  from "express";
import { getUsers, createUser, deleteUser, updateUser, userLogin } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import { sanitizeName } from "../middleware/sanitization.js";

const router = express.Router();

//GET
router.get("/", auth, getUsers);

//POST
router.post("/create-user", sanitizeName,createUser);
router.post("/login",userLogin);

//DELETE
router.delete("/delete-user/:id",auth, deleteUser); 

//PUT
router.put("/update-user/:id",auth, sanitizeName, updateUser ); 


export default router;