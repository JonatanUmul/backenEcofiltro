import { Router } from "express";
import { getTipoProv, postTipoProv } from '../../../../controllers/mantenimientos/Tip_Prov/proveedores.controller.js';


const router = Router();

router.get('/TipoProv', getTipoProv );
router.post('/TipoProv', postTipoProv );


export default router;
