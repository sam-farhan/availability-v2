import { Router } from 'express';
import { CheckUserSession } from '../middleware/UserSessionMiddleware';
import { param } from 'express-validator';
import { MyAvailability } from '../controllers/AvailabilityControllers';

const router = Router();

// My availability page.
router.get('/:year/:week',
    param('year').isInt({min: 0}).toInt(),
    param('week').isInt({min: 1, max: 52}).toInt(),
    // CheckUserSession,
    MyAvailability
);

export default router;
