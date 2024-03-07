import {customError} from '../middlewares/error-handler.mjs';
import {
    findActivityById,
    addActivity,
    deleteActivityById,
    updateActivityById,
    listAllActivitiesByUserId,
  } from '../models/activities-model.mjs';

const getActivities = async (req, res) => {
  try {
    // Varmistetaan, että käyttäjä on todennettu
    if (!req.user) {
      return res.status(401).json({virhe: 'Unauthorized'});
    }

    // Haetaan käyttäjän tunnus tokenista
    const userId = req.user.user_id;

    // Haetaan kirjaukset kirjautuneelle käyttäjälle
    const result = await listAllActivitiesByUserId(userId);

    // Jos kyselyssä ei tapahtunut virheitä, lähetetään vastaus kirjauksista
    res.json(result);
  } catch (error) {
    // Jos virhe tapahtuu hakuprosessin aikana.
    res.status(500).json({virhe: 'Server error'});
  }
};

const getActivityById = async (req, res, next) => {
  // Authentication: Check if user is authenticated
  if (!req.user) {
    return res.sendStatus(401); // Unauthorized
  }

  // Retrieve entry by id
  const entry = await findActivityById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Activity not found', 404));
  }
};

const postActivity = async (req, res, next) => {
    const userId = req.user.user_id;
    const result = await addActivity(req.body, userId);
    if (result.activity_id) {
      res.status(201);
      res.json({message: 'New activity added.', ...result});
    } else {
      next(new Error(result.error));
    }
  };

const putActivity = async (req, res, next) => {
    const activityId = req.params.id;
    const userId = req.user.user_id;
    const result = await updateActivityById(activityId, userId, req.body);
    if (result.error) {
    return next(customError(result.message, result.error));
    }
    return res.status(201).json(result);
};

const deleteEntry = async (req, res, next) => {
    const result = await deleteEntryById(req.params.id, req.user.user_id);
    if (result.error) {
    return next(customError(result.message, result.error));
    }
    return res.json(result);
};

const deleteActivity = async (req, res, next) => {
    const result = await deleteActivityById(req.params.id, req.user.user_id);
    if (result.error) {
      return next(customError(result.message, result.error));
    }
    return res.json(result);
  };

export {getActivities, getActivityById, postActivity, putActivity, deleteActivity};
