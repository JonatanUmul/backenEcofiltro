import { Router } from "express";
import { getEstProc, postEstProc } from "../../../../controllers/mantenimientos/estados_Proc/EstadosProc.controller.js";



const router = Router();

router.get('/EstadosProc', getEstProc );
router.post('/EstadosProc', postEstProc );


export default router;
