import { Request, Response, Router } from 'express'
const router = Router();

import revenue from './revenue'

router.use("/revenue", revenue);

export default router;