import { Router } from "express";
import { getmodulosTarimas,  } from "../../../../controllers/mantenimientos/modulosTarimas/ModulosTarimas.controller.js"


const router = Router();

router.get('/modulosTarimas', getmodulosTarimas );


export default router;
