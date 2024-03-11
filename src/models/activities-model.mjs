// Note: db functions are async and must be called with await from the controller
import promisePool from '../utils/database.mjs';

const listAllActivities = async () => {
  try {
    const sql = 'SELECT * FROM activities';
    const [rows] = await promisePool.query(sql);
    console.log(sql)
    return rows;
  } catch (error) {
    console.error('listAllActivities', error);
    return { error: 500, message: 'Database error' };
  }
};

const listAllActivitiesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM activities WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findActivityById = async (id, userId) => {
    try {
        const [rows] = await promisePool.query(
        'SELECT * FROM activities WHERE activity_id = ? AND user_id = ?',
        [id, userId],
        );
        // console.log('rows', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        return {error: e.message};
    }
};

const updateActivityById = async (activityId, userId, activityData) => {
  try {
    const allowedFields = {
      activity_type: activityData.activity_type,
      intensity: activityData.intensity,
      duration: activityData.duration,
    };

    activityId = parseInt(activityId);
    const sql = promisePool.format(
      `UPDATE activities SET ?
      WHERE activity_id=? AND user_id=?`,
      [allowedFields, activityId, userId]
      );
      const [result] = await promisePool.query(sql);

      if (result.affectedRows === 0) {
          return { error: 404, message: 'Activity not found' };
      }
      return { message: 'Activity data updated', activityId: activityId };
  } catch (error) {
      console.error('updateActivityById', error);
      return { error: 500, message: 'db error' };
  }
};



const deleteActivityById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM activities WHERE activity_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Activity not found'};
    }
    return {message: 'Activity deleted', entry_id: id};
  } catch (error) {
    console.error('deleteActivityById', error);
    return {error: 500, message: 'db error'};
  }
};

const addActivity = async (activity, userId) => {
    const sql = `INSERT INTO activities
                 (user_id, activity_type, intensity, duration)
                 VALUES (?, ?, ?, ?)`;
    const params = [
      userId,
      activity.activity_type,
      activity.intensity,
      activity.duration,
    ];
    try {
      const rows = await promisePool.query(sql, params);
      console.log(userId)
      return {activity_id: rows[0].insertId};
    } catch (e) {
      console.error('error', e.message);
      return {error: e.message};
    }
  };

export {
  listAllActivities,
  listAllActivitiesByUserId,
  findActivityById,
  addActivity,
  updateActivityById,
  deleteActivityById,
};
