import express from "express";
import { signup, login, logout, getAuth, updateAvatar, editUser, handleSkip } from "../controls/auth.control.js";
import { checkUserAuth } from "../checkUserAuth.js";

const router = express.Router();
    
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateAvatar", checkUserAuth, updateAvatar);
router.put("/editUser", checkUserAuth, editUser);
router.post("/skip", checkUserAuth, handleSkip);

router.get("/getAuth", checkUserAuth, getAuth);

export default router;
