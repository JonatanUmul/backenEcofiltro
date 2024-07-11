import { Router } from "express";
import { getTipoMantenimiento, } from "../../../../controllers/mantenimientos/tipoantenimiento/TipoMantenimiento.js"


const router = Router();

router.get('/TipoMantenimiento', getTipoMantenimiento );


export default router;
