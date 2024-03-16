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

  /**
 * @api {get} api/measurements Get logged in user's measurements
 * @apiVersion 1.0.0
 * @apiName GetMeasurements
 * @apiGroup Measurements
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} measurements List of measurements belonging to the logged in user.
 * @apiSuccess {Number} measurements.measurement_id Id of the measurement.
 * @apiSuccess {Number} measurements.user_id Id of the user who created the measurement.
 * @apiSuccess {String} measurements.measurement_type Type of the measurement.
 * @apiSuccess {Number} measurements.value Value of the measurement.
 * @apiSuccess {String} measurements.unit Unit of the measurement.
 * @apiSuccess {String} measurements.notes Additional notes for the measurement.
 * @apiSuccess {Date} measurements.measurement_time Time of the measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *            "measurement_id": 34,
 *            "user_id": 17,
 *            "measurement_type": "Blood Pressure",
 *            "value": "130.00",
 *            "unit": "mmHg",
 *            "notes": "Normal",
 *            "measurement_time": "2024-03-15T22:47:42.000Z"
 *        }
 *     ]
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

/**
 * @api {post} api/measurements Create a new measurement for a logged in user
 * @apiVersion 1.0.0
 * @apiName PostMeasurement
 * @apiGroup Measurements
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} measurement_type Type of the measurement.
 * @apiParam {Number} value Value of the measurement.
 * @apiParam {String} [unit] Unit of the measurement (optional).
 * @apiParam {String} [notes] Additional notes for the measurement (optional).
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "measurement_type": "Blood Pressure",
 *       "value": 130,
 *       "unit": "mmHg",
 *       "notes": "Normal"
 *     }
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} measurement_id Id of the newly created measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "New measurement added.",
 *        "measurement_id": 34
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

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

 /**
 * @api {get} api/measurements/:id Get a specific measurement for a logged in user
 * @apiVersion 1.0.0
 * @apiName GetMeasurementById
 * @apiGroup Measurements
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the measurement.
 *
 * @apiSuccess {Number} measurement_id Id of the measurement.
 * @apiSuccess {Number} user_id Id of the user who created the measurement.
 * @apiSuccess {String} measurement_type Type of the measurement.
 * @apiSuccess {Number} value Value of the measurement.
 * @apiSuccess {String} unit Unit of the measurement.
 * @apiSuccess {String} notes Additional notes for the measurement.
 * @apiSuccess {Date} measurement_time Time of the measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "measurement_id": 34,
 *        "user_id": 17,
 *        "measurement_type": "Blood Pressure",
 *        "value": "130.00",
 *        "unit": "mmHg",
 *        "notes": "Normal",
 *        "measurement_time": "2024-03-15T22:47:42.000Z"
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

 /**
 * @api {put} api/measurements/:id Update a measurement for a logged in user
 * @apiVersion 1.0.0
 * @apiName PutMeasurement
 * @apiGroup Measurements
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the measurement to be updated.
 * @apiParam {String} [measurement_type] New type of the measurement (optional).
 * @apiParam {Number} [value] New value of the measurement (optional).
 * @apiParam {String} [unit] New unit of the measurement (optional).
 * @apiParam {String} [notes] New additional notes for the measurement (optional).
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "measurement_type": "Blood Pressure",
 *       "value": 139,
 *       "unit": "mmHg",
 *       "notes": "Fasting"
 *     }
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} measurementId Id of the updated measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "Measurements data updated",
 *        "measurementId": "34"
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

 /**
 * @api {delete} api/measurements/:id Delete a measurement for a logged in user
 * @apiVersion 1.0.0
 * @apiName DeleteMeasurement
 * @apiGroup Measurements
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the measurement to be deleted.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} measurementId Id of the deleted measurement.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Measurement deleted",
 *        "measurementId": "34"
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

 /**
 * @api {post} api/activities Post activity
 * @apiVersion 1.0.0
 * @apiName PostActivity
 * @apiGroup Activities
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} activity_type Type of the activity.
 * @apiParam {Number} intensity Intensity of the activity.
 * @apiParam {String} duration Duration of the activity (in format HH:MM:SS).
 * @apiParam {Number} user_id Id of the user who performed the activity.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "activity_type": "Swimming",
 *       "intensity": 8,
 *       "duration": "01:15:00",
 *       "user_id": 16
 *     }
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} activity_id Id of the newly created activity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "New activity added.",
 *        "activity_id": 38
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

 /**
 * @api {put} api/activities/:id Update activity
 * @apiVersion 1.0.0
 * @apiName PutActivity
 * @apiGroup Activities
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the activity to be updated.
 * @apiParam {String} [activity_type] Updated type of the activity (optional).
 * @apiParam {Number} [intensity] Updated intensity of the activity (optional).
 * @apiParam {String} [duration] Updated duration of the activity (in format HH:MM:SS, optional).
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "activity_type": "Swimming",
 *       "intensity": 8,
 *       "duration": "01:15:00"
 *     }
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Number} activityId Id of the updated activity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "Activity data updated",
 *        "activityId": 38
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

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
