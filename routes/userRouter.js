import router from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const routers = router.Router();

routers.route("/register").post(registerUser);
routers.route("/login").post(loginUser);

export default routers;
