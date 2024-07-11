import { Router } from "express";
import { getcalificacion,  } from "../../../../controllers/mantenimientos/calificacion/Calificacion.controller.js";


const router = Router();

router.get('/calificacion', getcalificacion );


export default router;
