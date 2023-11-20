import { Request, Response, NextFunction } from 'express'
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const auth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization || req.headers.Authorization;

    if (!token || token !== `Bearer ${SECRET_TOKEN}`)
        return res.status(401).json({ error: 'Unauthorized' });

    next();
};

export default auth;
