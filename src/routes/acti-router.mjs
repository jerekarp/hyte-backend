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

/**
 * @api {get} activities Get all activities for a logged in user
 * @apiVersion 1.0.0
 * @apiName GetActivities
 * @apiGroup Activities
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} activities List of activities belonging to the logged in user.
 * @apiSuccess {Number} activities.activity_id Id of the activity.
 * @apiSuccess {Number} activities.user_id Id of the user who performed the activity.
 * @apiSuccess {String} activities.activity_type Type of the activity.
 * @apiSuccess {Number} activities.intensity Intensity of the activity.
 * @apiSuccess {String} activities.created_at Time when the activity was created.
 * @apiSuccess {String} activities.duration Duration of the activity (in format HH:MM:SS).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *            "activity_id": 35,
 *            "user_id": 17,
 *            "activity_type": "Swimming",
 *            "intensity": 8,
 *            "created_at": "2024-03-15T23:01:59.000Z",
 *            "duration": "01:15:00"
 *        },
 *        {
 *            "activity_id": 36,
 *            "user_id": 17,
 *            "activity_type": "Swimming",
 *            "intensity": 8,
 *            "created_at": "2024-03-15T23:02:09.000Z",
 *            "duration": "01:15:00"
 *        },
 *        {
 *            "activity_id": 37,
 *            "user_id": 17,
 *            "activity_type": "Swimming",
 *            "intensity": 8,
 *            "created_at": "2024-03-15T23:02:13.000Z",
 *            "duration": "01:15:00"
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
 * @api {post} activities Post activity
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

  /**
 * @api {get} activities/:id Get activities by id
 * @apiVersion 1.0.0
 * @apiName GetActivityById
 * @apiGroup Activities
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the activity.
 *
 * @apiSuccess {Number} activity_id Id of the activity.
 * @apiSuccess {Number} user_id Id of the user who performed the activity.
 * @apiSuccess {String} activity_type Type of the activity.
 * @apiSuccess {Number} intensity Intensity of the activity.
 * @apiSuccess {String} created_at Time when the activity was created.
 * @apiSuccess {String} duration Duration of the activity (in format HH:MM:SS).
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "activity_id": 35,
 *        "user_id": 17,
 *        "activity_type": "Swimming",
 *        "intensity": 8,
 *        "created_at": "2024-03-15T23:01:59.000Z",
 *        "duration": "01:15:00"
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
 * @api {put} activities/:id Update activity
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
 * @apiSuccess {Number} activity_id Id of the updated activity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "message": "Activity data updated",
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
 * @api {delete} activities/:id Delete activity
 * @apiVersion 1.0.0
 * @apiName DeleteActivity
 * @apiGroup Activities
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {Number} id Id of the activity to be deleted.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {String} activity_id of the deleted activity.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Activity deleted",
 *        "acticity_id": "38"
 *     }
 *
 * @apiError UnauthorizedError Invalid token provided.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token"
 *     }
 */

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
