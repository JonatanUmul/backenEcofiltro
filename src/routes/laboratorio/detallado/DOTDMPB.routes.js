import { Router } from "express";
import {  postDOTDMPB, getDOTDMPB  } from "../../../../controllers/laboratorio/detalle/DOTDMPB.controllers.js";
import {IndicesAtterberg, GetIndicesAtterberg} from "../../../../controllers/laboratorio/detalle/IndicesAtterberg.controllers.js"


const router = Router();    


router.post('/DOTDMPB', postDOTDMPB);
router.get('/DOTDMPB/:id', getDOTDMPB);

router.post('/IndicesAtterberg',IndicesAtterberg)
router.get('/IndicesAtterberg/:fecha', GetIndicesAtterberg)
export default router;
