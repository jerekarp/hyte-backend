import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const sql = 'SELECT * FROM diaryentries';
    const [rows] = await promisePool.query(sql);
    console.log(sql)
    return rows;
  } catch (error) {
    console.error('listAllEntries', error);
    return { error: 500, message: 'Database error' };
  }
};

const selectEntryById = async (id) => {
  try {
    const sql = 'SELECT * FROM diaryentries WHERE entry_id = ?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    if (rows.length === 0) {
      return { error: 404, message: 'Entry not found' };
    }
    return rows[0];
  } catch (error) {
    console.error('selectEntryById', error);
    return { error: 500, message: 'Database error' };
  }
};

const updateEntryById = async (entry_id, entry) => {
  try {
    const sql = 'UPDATE diaryentries SET mood=?, weight=?, sleep_hours=?, notes=?, created_at=? WHERE entry_id=?';
    const params = [entry.mood, entry.weight, entry.sleep_hours, entry.notes, entry.created_at, entry_id];
    await promisePool.query(sql, params);
    return { message: 'Entry updated', entry_id: entry_id };
  } catch (error) {
    console.error('updateEntryById', error);
    return { error: 500, message: 'Database error' };
  }
};

const deleteEntryById = async (entry_id) => {
  try {
    const sql = 'DELETE FROM diaryentries WHERE entry_id=?';
    const params = [entry_id];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return { error: 404, message: 'Entry not found' };
    }
    return { message: 'Entry deleted', entry_id: entry_id };
  } catch (error) {
    console.error('deleteEntryById', error);
    return { error: 500, message: 'Database error' };
  }
};

export { listAllEntries, selectEntryById, updateEntryById, deleteEntryById };
