import { customError } from '../middlewares/error-handler.mjs';
import {
  listAllMeasurementsByUserId,
  listAllMeasurements,
  findMeasurementById,
  updateMeasurementById,

} from '../models/measure-model.mjs';

const getMeasurements = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.user_id;
    const result = await listAllMeasurementsByUserId(userId);
    res.json(result);
  } catch (error) {
    next(new Error(error));
  }
};

const getMeasurementById = async (req, res, next) => {
  // Authentication: Check if user is authenticated
  if (!req.user) {
    return res.sendStatus(401); // Unauthorized
  }

  // Retrieve measurement by id
  const entry = await findMeasurementById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Measurement not found', 404));
  }
};

const putMeasurement = async (req, res, next) => {
    const measurementId = req.params.id;
    const userId = req.user.user_id;

    try {
        // Haetaan kaikki mittaukset käyttäen user_id:tä
        const userMeasurements = await listAllMeasurementsByUserId(userId);

        // Tarkistetaan, onko muokattava käytän haluama muokattava mittaus käyttäjän luoma
        const foundMeasurement = userMeasurements.find(measurement => measurement.measurement_id === parseInt(measurementId) && measurement.user_id === userId);

        if (!foundMeasurement) {
            return next(customError('Measurement not found or unauthorized', 404));
        }

        const result = await updateMeasurementById(measurementId, userId, req.body);
        if (result.error) {
            return next(customError(result.message, result.error));
        }

        return res.status(201).json(result);
    } catch (error) {
        next(new Error(error));
    }
};



const postMeasurement = async (req, res, next) => {
};

const deleteMeasurement = async (req, res, next) => {
};


export { getMeasurements, getMeasurementById, postMeasurement, putMeasurement, deleteMeasurement };
