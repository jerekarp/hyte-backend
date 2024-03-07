import express from 'express';
import {body, param} from 'express-validator'
import {
  deleteActivity,
  getActivities,
  getActivityById,
  postActivity,
  putActivity,
} from '../controllers/acti-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

const activitiesRouter = express.Router();

activitiesRouter
  .route('/')
  .get(authenticateToken, getActivities)
  .post(
    authenticateToken,
    body('activity_type').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('intensity').optional().isInt({min: 0, max: 10}),
    body('duration')
    .optional()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage('Duration must be in format HH:MM:SS'),
    validationErrorHandler,
    postActivity,
  );

activitiesRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getActivityById,
  )
  .put(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    // user_id is not allowed to be changed
    body('user_id', 'not allowed').not().exists(),
    body('activity_type').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('intensity').optional().isInt({min: 0, max: 10}),
    body('duration')
    .optional()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage('Duration must be in format HH:MM:SS'),
    validationErrorHandler,
    putActivity,
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteActivity,
  );

export default activitiesRouter;
