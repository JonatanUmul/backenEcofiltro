import { Router } from "express";
import { PostCreateProv } from '../../../../controllers/mantenimientos/proveedores/CreateProv.controller.js';


const router = Router();

// router.get('/TipoProv', getTipoProv );
router.post('/CreateProv', PostCreateProv );


export default router;
