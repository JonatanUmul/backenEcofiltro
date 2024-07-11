import { Router } from "express";
import {  getCernidoDetalle } from '../../../../controllers/mantenimientos/CernidoDetalle/CernidoDetalle.js';


const router = Router();

router.get('/CernidoDetalle', getCernidoDetalle );



export default router;
