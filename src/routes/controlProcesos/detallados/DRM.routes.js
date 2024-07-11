import { Router } from "express";
import {  postDRM, getDRM } from "../../../../controllers/controlProcesos/detalle/DRM.controllers.js";



const router = Router();


router.post('/DRM', postDRM);
router.get('/DRM/:id', getDRM);

export default router;
