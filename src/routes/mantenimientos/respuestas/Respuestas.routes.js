import { Router } from "express";
import { getRespuestas } from "../../../../controllers/mantenimientos/respuestas/Respuestas.controller.js";
;


const router = Router();

router.get('/respuestas', getRespuestas );


export default router;
