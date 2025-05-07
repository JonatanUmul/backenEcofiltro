import { Router } from "express";
import { getAreas, getProceso  } from '../../../../controllers/mantenimientos/Areas/Areas.controller.js';


const router = Router();

router.get('/Area', getAreas);
router.get('/Proceso', getProceso)


export default router;
