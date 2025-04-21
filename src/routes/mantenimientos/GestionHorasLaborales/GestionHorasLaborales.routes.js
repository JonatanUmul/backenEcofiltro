import { Router } from "express";
import { getGestionDiasLaborales, getGestionHorasLaborales  } from '../../../../controllers/mantenimientos/GestionHorasLaborales/GestionHorasLaborales.controller.js';


const router = Router();

router.get('/GestionDiasLaborales', getGestionDiasLaborales);
router.get('/GestionHorasLaborales', getGestionHorasLaborales)



export default router;
