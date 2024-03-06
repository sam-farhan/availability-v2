import { Request, Response, Router } from 'express';
import { CheckUserSession } from '../middleware/UserSessionMiddleware';
import { body, param } from 'express-validator';
import { CreateSquadController } from '../controllers/SquadControllers';

const router = Router();

// Create squad page.
router.get('/create', CheckUserSession, (req: Request, res: Response) => {
    res.render("pages/squad/createSquad");
});

// Create squad post.
router.post('/create', 
    body('name').not().isEmpty().isLength({min: 3}).trim().escape(),
    CheckUserSession,
    CreateSquadController
);

export default router;
