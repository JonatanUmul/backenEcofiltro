import { getRevisionMaquinaria } from '../../../../controllers/mantenimientos/revisionMaq/RevisionMaq.controller.js';
import { Router } from 'express';

// Crea una instancia del enrutador
const router = Router();

// router.post('/UsuariosR', postUsuarios);
router.get('/RevisionMaquinaria', getRevisionMaquinaria);

export default router;
