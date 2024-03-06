import { Router, Request, Response } from 'express';
import { RequireUserSession } from '../middleware/UserSessionMiddleware';

const router = Router();

// Profile page.
router.get('/profile', RequireUserSession, (req: Request, res: Response) => {
    res.render("pages/user/profile");
});

export default router;
