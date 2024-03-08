import { Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { userEmailIsUnique, userPasswordIsValid, validatePasswordMatch } from '../validators/AuthValidation';
import { ResetPasswordRequest, ResetPasswordPage, SignIn, SignOut, SignUp, ResetPassword } from '../controllers/AuthControllers';
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

// Reset password page.
router.get('/reset/:id',
    param("id").isLength({ max: 5, min: 5 }).trim().escape(),
    CheckNoUserSession,
    ResetPasswordPage
);

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
    ResetPasswordRequest
);

// Reset password post.
router.post('/reset/:id',
    param("id").isLength({ max: 5, min: 5 }).trim().escape(),
    body('password').custom(userPasswordIsValid),
    validatePasswordMatch,
    CheckNoUserSession,
    ResetPassword
);

export default router;
