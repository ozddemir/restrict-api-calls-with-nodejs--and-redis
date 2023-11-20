import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
const app = express();

app.use(express.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const PORT = process.env.PORT || 3000;

app.use('/', routes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

