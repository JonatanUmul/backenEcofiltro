import { Router } from "express";
import { getEstMaq, postEstMaq } from "../../../../controllers/mantenimientos/estados_Maq/EstadosMaq.controller.js";



const router = Router();

router.get('/EstadosMaq', getEstMaq );
router.post('/EstadosMaq', postEstMaq );

export default router;
