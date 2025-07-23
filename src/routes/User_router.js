import express from 'express';
import { userRegister, loginUser, deleteUser, logout } from '../controllers/userController.js'
import verifyJwt from '../middleware/jwt/verifyJwt.js'

const router = express.Router();





router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(verifyJwt, deleteUser)
router.route("/logout").post(verifyJwt, logout)





export default router;