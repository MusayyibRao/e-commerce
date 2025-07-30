import express from 'express';
import { userRegister, loginUser, deleteUser, logout, getAllUsers, passwordChange, sendVerficationCode, verifyCode } from '../controllers/userController.js'
import verifyJwt from '../middleware/jwt/verifyJwt.js';
import isAdmin from '../middleware/verify_admin/isAdmin.js'

const router = express.Router();



router.route("/register").post(userRegister);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(verifyJwt, isAdmin, deleteUser)
router.route("/logout").post(verifyJwt, logout)
router.route("/getalluser").get(verifyJwt, isAdmin, getAllUsers)
router.route("/changePass").post(verifyJwt, passwordChange)
router.route("/sendVerficationCode").patch(verifyJwt, sendVerficationCode)
router.route("/verifyCode").patch(verifyJwt, verifyCode)

export default router;