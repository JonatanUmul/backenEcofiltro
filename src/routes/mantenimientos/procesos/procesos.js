import { Router } from "express";
import { getprocesos,  } from "../../../../controllers/mantenimientos/procesos/Procesos.controller.js";


const router = Router();

router.get('/Procesos', getprocesos );


export default router;
