import express, { Express, Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('<h1>Server in work...</h1>');
});

module.exports = router;