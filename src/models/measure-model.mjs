import promisePool from '../utils/database.mjs';

const listAllMeasurements = async () => {
  try {
    const sql = 'SELECT * FROM measurements';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (error) {
    console.error('listAllMeasurements', error.message);
    return { error: 500, message: 'Database error' };
  }
};

const listAllMeasurementsByUserId = async (userId) => {
  try {
    const sql = 'SELECT * FROM measurements WHERE user_id = ?';
    const params = [userId];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.error('listAllMeasurementsByUserId', error.message);
    return { error: 500, message: 'Database error' };
  }
};

const findMeasurementById = async (measurementId, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM measurements WHERE measurement_id = ? AND user_id = ?',
      [measurementId, userId],
    );
    return rows[0];
  } catch (error) {
    console.error('findMeasurementById', error.message);
    return {error: e.message};
  }
};

const updateMeasurementById = async (measurementId, userId, measurementData) => {
  try {
    const allowedFields = {
      measurement_type: measurementData.measurement_type,
      value: measurementData.value,
      unit: measurementData.unit,
      notes: measurementData.notes,
    };

    const sql = promisePool.format(
      `UPDATE measurements SET ?
       WHERE measurement_id = ? AND user_id = ?`,
      [allowedFields, measurementId, userId]
    );

    const [result] = await promisePool.query(sql);

    if (result.affectedRows === 0) {
      return { error: 404, message: 'Measurement not found' };
    }

    return { message: 'Measurements data updated', measurementId: measurementId};
  } catch (error) {
    console.error('updateMeasurementById', error);
    return { error: 500, message: 'db error' };
  }
};

export {
  listAllMeasurements,
  listAllMeasurementsByUserId,
  findMeasurementById,
  updateMeasurementById,
};
