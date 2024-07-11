import { Router } from "express";
import { postUsuarios } from "../../controllers/Login.controller.js";


const router = Router();

router.post('/Loginroutes', postUsuarios );

export default router;
