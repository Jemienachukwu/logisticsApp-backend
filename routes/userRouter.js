import router from "express";
import {
  registerUser,
  loginUser,
  userProfile,
  emailVerify,
} from "../controllers/userController.js";
import { Protect } from "../middleware/AuthMiddleware.js";

const routers = router.Router();

routers.route("/register").post(registerUser);
routers.route("/login").post(loginUser);
routers.route("/verify").post(emailVerify);
routers.route("/profile").get(Protect, userProfile);

export default routers;
