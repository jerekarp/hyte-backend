import express from 'express';
import { body, param } from 'express-validator';
import {
  deleteMeasurement,
  getMeasurements,
  getMeasurementById,
  postMeasurement,
  putMeasurement,
} from '../controllers/meas-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

const measurementsRouter = express.Router();

measurementsRouter
  .route('/')
  .get(authenticateToken, getMeasurements)
  .post(
    authenticateToken,
    body('measurement_type').trim().isLength({ min: 3, max: 30 }).isString(),
    body('value').isDecimal(),
    body('unit').optional().trim().isLength({ max: 10 }).isString(),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    body('measurement_time').optional().isISO8601().toDate(),
    validationErrorHandler,
    postMeasurement,
  );

measurementsRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getMeasurementById,
  )
  .put(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    body('measurement_type').optional().trim().isLength({ min: 3, max: 255 }).isString(),
    body('value').isDecimal(),
    body('unit').optional().trim().isLength({ max: 10 }).isString(),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    body('measurement_time').optional().isISO8601().toDate(),
    validationErrorHandler,
    putMeasurement,
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteMeasurement,
  );

export default measurementsRouter;
