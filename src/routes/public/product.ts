import { Router } from 'express'
const router = Router();

router.get("/", (req, res) => {
    res.send({
        name: "shirt",
        color:"white",
        price:"20 EU"
    });
});

export default router;