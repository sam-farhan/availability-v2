import { Router } from 'express';
import { RequireUserSession } from '../middleware/UserSessionMiddleware';
import { body, param } from 'express-validator';
import { EditAvailability, MyAvailability, SubmitAvailability } from '../controllers/AvailabilityControllers';

const router = Router();

// My availability page.
router.get('/:year/:week',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    RequireUserSession,
    MyAvailability
);

// Edit availability page.
router.get('/:year/:week/edit',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    RequireUserSession,
    EditAvailability
);

// Submit availability.
router.post('/:year/:week',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    // body("availability").not().isEmpty().trim().escape(),
    RequireUserSession,
    SubmitAvailability
);

export default router;
