import {Router} from 'express';
import {getMateriaPriaBarro} from '../../../controllers/materiasPrimas/MateriaPriaBarro.router.js'


const router=Router()

router.get('/MateriaPriaBarro', getMateriaPriaBarro)



export default router;