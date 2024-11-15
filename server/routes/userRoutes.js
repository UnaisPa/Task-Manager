import express from "express"
import {createUser} from "../controllers/userController/registerController.js";
import findUser from "../controllers/userController/findUserController.js";
import googleAuth from "../controllers/userController/googleAuthController.js";

const router = express.Router();
// Define routes for user-related actions


router.post('/register',createUser);
router.post('/login',findUser);
router.post('/google_auth', googleAuth)


export default router
