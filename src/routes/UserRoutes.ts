import { Router, Request, Response } from 'express';
import { CheckUserSession } from '../middleware/UserSessionMiddleware';

const router = Router();

// Profile page.
router.get('/profile', CheckUserSession, (req: Request, res: Response) => {
    res.render("pages/user/profile");
});

export default router;
