import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { userEmailIsUnique, userNameIsUnique, userPasswordIsValid } from '../validators/AuthValidation';
import { SignIn, SignOut, SignUp } from '../controllers/AuthControllers';
import { CheckNoUserSession, CheckUserSession } from '../middleware/UserSessionMiddleware';

const router = Router();

// Signup page.
router.get('/signup', CheckNoUserSession, (req: Request, res: Response) => {
    res.render("pages/auth/signup");
});

// Signup page.
router.get('/signin', CheckNoUserSession, (req: Request, res: Response) => {
    res.render("pages/auth/signin");
});


// Signup post.
router.post("/signup", CheckNoUserSession,
    body('email').isEmail().normalizeEmail().custom(userEmailIsUnique),
    body('username').not().isEmpty().trim().escape().custom(userNameIsUnique),
    body('password').custom(userPasswordIsValid),
    SignUp
);

// Signin post.
router.post("/signin", CheckNoUserSession,
    body('username').not().isEmpty().trim().escape(),
    body('password').custom(userPasswordIsValid),
    SignIn
);

// Signout post.
router.post("/signout", CheckUserSession,
    SignOut
);

export default router;
