import { Router } from "express";
import {  PostCreateProv, getProv } from '../../../../controllers/mantenimientos/proveedores/CreateProv.controller.js';


const router = Router();

router.get('/Provedores', getProv );
router.post('/Provedores', PostCreateProv );


export default router;
