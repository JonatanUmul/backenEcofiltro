import { Router } from "express";
import {  PostMatPrim, getMatPrim } from '../../../../controllers/mantenimientos/materiaPrimas/MateriaPrimas.controller.js';


const router = Router();

router.get('/MateriaPrima', getMatPrim );
router.post('/MateriaPrima', PostMatPrim );


export default router;
