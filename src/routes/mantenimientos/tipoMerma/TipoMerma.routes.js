import { Router } from "express";
import { getTipoMermas, } from "../../../../controllers/mantenimientos/tipoMerma/TipoMerma.js"


const router = Router();

router.get('/tipoMermas', getTipoMermas );


export default router;
