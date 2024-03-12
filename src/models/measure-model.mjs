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

const deleteMeasurementById = async (measurementId, userId) => {
  try {
    const sql = 'DELETE FROM measurements WHERE measurement_id=? AND user_id=?';
    const params = [measurementId, userId];

    console.log('SQL:', sql);
    console.log('Params:', params);

    const [result] = await promisePool.query(sql, params);

    console.log('Result:', result);

    if (result.affectedRows === 0) {
      console.log('No rows affected.');
      return { error: 404, message: 'Measurement not found' };
    }

    console.log(`${result.affectedRows} rows affected.`);
    console.log('Measurement deleted:', measurementId);

    return { message: 'Measurement deleted', measurementId: measurementId };
  } catch (error) {
    console.error('deleteMeasurementById', error);
    return { error: 500, message: 'db error' };
  }
};

const addMeasurement = async (measurementData, userId) => {
  const sql = `INSERT INTO measurements
               (user_id, measurement_type, value, unit, notes)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [
    userId,
    measurementData.measurement_type,
    measurementData.value,
    measurementData.unit,
    measurementData.notes,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    return {measurement_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


export {
  listAllMeasurements,
  listAllMeasurementsByUserId,
  findMeasurementById,
  updateMeasurementById,
  deleteMeasurementById,
  addMeasurement,
};
