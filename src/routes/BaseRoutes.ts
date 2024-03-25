import { Router, Request, Response } from 'express';

const router = Router();

// Index page.
router.get('/', (req: Request, res: Response) => {
    res.render("pages/index");
});

export default router;
