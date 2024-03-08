import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { userEmailIsUnique, userPasswordIsValid, validatePasswordMatch } from '../validators/AuthValidation';
import { ResetPassword, SignIn, SignOut, SignUp } from '../controllers/AuthControllers';
import { CheckNoUserSession, RequireUserSession } from '../middleware/UserSessionMiddleware';

const router = Router();

// Signup page.
router.get('/signup', CheckNoUserSession, (req: Request, res: Response) => {
    res.render("pages/auth/signup");
});

// Signup page.
router.get('/signin', CheckNoUserSession, (req: Request, res: Response) => {
    res.render("pages/auth/signin");
});

// Reset password page.
router.get('/reset', CheckNoUserSession, (req: Request, res: Response) => {
    res.render("pages/auth/reset");
});

// Signup post.
router.post("/signup", CheckNoUserSession,
    body('email').isEmail().normalizeEmail().custom(userEmailIsUnique),
    body('first_name').not().isEmpty().trim().escape(),
    body('last_name').not().isEmpty().trim().escape(),
    body('password').custom(userPasswordIsValid),
    validatePasswordMatch,
    SignUp
);

// Signin post.
router.post("/signin", CheckNoUserSession,
    body('email').not().isEmpty().trim().escape(),
    body('password').custom(userPasswordIsValid),
    SignIn
);

// Signout post.
router.post("/signout", RequireUserSession,
    SignOut
);

// Reset post.
router.post("/reset", CheckNoUserSession,
    body('email').not().isEmpty().trim().escape(),
    ResetPassword
);

export default router;
