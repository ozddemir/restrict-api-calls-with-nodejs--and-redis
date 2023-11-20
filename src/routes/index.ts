import { Request, Response, Router } from 'express'
const router = Router();

import { ipBasedLimiter, tokenBasedLimiter } from '../middleware/rate-limiter';
import auth from '../middleware/auth';
import privateRoutes from './private'
import publicRoutes from './public'

router.use('/public', ipBasedLimiter, publicRoutes);
router.use('/private', [auth, tokenBasedLimiter], privateRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("It is alive!");
});

export default router;