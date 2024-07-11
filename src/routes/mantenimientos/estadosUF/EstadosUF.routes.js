import { Router } from "express";
import {  getEstadosuf } from '../../../../controllers/mantenimientos/estadosUF/EstadosUF.controllers.js';


const router = Router();

router.get('/Estadouf', getEstadosuf );



export default router;
