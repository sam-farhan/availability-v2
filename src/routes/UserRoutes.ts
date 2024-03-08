import { Router, Request, Response } from 'express';
import { RequireUserSession } from '../middleware/UserSessionMiddleware';
import { body } from 'express-validator';
import { userEmailIsUnique, userPasswordIsValid, validatePasswordMatch } from '../validators/AuthValidation';
import { ChangeDetails, ChangePassword } from '../controllers/UserControllers';

const router = Router();

// Profile page.
router.get('/profile', RequireUserSession, (req: Request, res: Response) => {
    res.render("pages/user/profile");
});

// Change details.
router.post('/details',
    RequireUserSession,
    body('email').isEmail().normalizeEmail().custom(userEmailIsUnique),
    body('first_name').not().isEmpty().trim().escape(),
    body('last_name').not().isEmpty().trim().escape(),
    ChangeDetails
);

// Change password.
router.post('/password',
    RequireUserSession,
    body('password').custom(userPasswordIsValid),
    validatePasswordMatch,
    ChangePassword
);

export default router;
