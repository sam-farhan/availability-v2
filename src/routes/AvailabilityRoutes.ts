import { Router } from 'express';
import { CheckUserSession } from '../middleware/UserSessionMiddleware';
import { body, param } from 'express-validator';
import { EditAvailability, MyAvailability, SubmitAvailability } from '../controllers/AvailabilityControllers';

const router = Router();

// My availability page.
router.get('/:year/:week',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    CheckUserSession,
    MyAvailability
);

// Edit availability page.
router.get('/:year/:week/edit',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    CheckUserSession,
    EditAvailability
);

// Submit availability.
router.post('/:year/:week',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    // body("availability").not().isEmpty().trim().escape(),
    CheckUserSession,
    SubmitAvailability
);

export default router;
