import { Router } from "express";
import {  PostOperarios, getOperarios, getOperarioss, getOperarioUser } from '../../../../controllers/mantenimientos/operarios/OperariosAreas.controller.js';


const router = Router();

router.get('/Operarios/:id_area/:id_area2', getOperarios );
router.get('/Operarios/:id_area', getOperarioss );
router.get('/Operarios' ,getOperarioUser)
router.post('/Operarios', PostOperarios );


export default router;
