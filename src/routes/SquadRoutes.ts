import { Request, Response, Router } from 'express';
import { RequireUserSession } from '../middleware/UserSessionMiddleware';
import { body, param } from 'express-validator';
import { AddUserToSquadController, ChangeUserRoleInSquadController, CreateSquadController, RemoveUserFromSquadController, ViewSquad, ViewSquadAvailability } from '../controllers/SquadControllers';
import { CheckUserInSquad, userRoleValid } from '../validators/SquadValidation';

const router = Router();

// Create squad page.
router.get('/create', RequireUserSession, (req: Request, res: Response) => {
    res.render("pages/squad/createSquad");
});

// View squad page.
router.get('/:id',
    param('id').isInt().toInt(),
    RequireUserSession,
    CheckUserInSquad,
    ViewSquad
);

// View squad availability page.
router.get('/:id/availability/:year/:week',
    param('id').isInt().toInt(),
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    //RequireUserSession,
    //CheckUserInSquad,
    ViewSquadAvailability
);


// Create squad post.
router.post('/create', 
    body('name').not().isEmpty().isLength({min: 3}).trim().escape(),
    RequireUserSession,
    CreateSquadController
);

// Add user to squad.
router.post('/:id/users', 
    body('user').not().isEmpty().isInt().toInt(),
    param('id').isInt().toInt(),
    RequireUserSession,
    CheckUserInSquad,
    AddUserToSquadController
);


// Remove user from squad delete.
router.delete('/:id/users', 
    body('user').not().isEmpty().isInt().toInt(),
    param('id').isInt().toInt(),
    RequireUserSession,
    CheckUserInSquad,
    RemoveUserFromSquadController
);

// Change user role in squad.
router.patch('/:id/users', 
    body('user').not().isEmpty().isInt().toInt(),
    body('role').not().isEmpty().custom(userRoleValid),
    param('id').isInt().toInt(),
    RequireUserSession,
    CheckUserInSquad,
    ChangeUserRoleInSquadController
);

export default router;
