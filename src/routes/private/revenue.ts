import { Request, Response, Router } from 'express'
const router = Router();


router.get("/", (req: Request, res: Response) => {
    res.send({ total: "500 EU" });
});

export default router;