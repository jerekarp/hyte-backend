// Note: db functions are async and must be called with await from the controller
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

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query(
        'SELECT * FROM DiaryEntries WHERE entry_id = ?',
        [id],
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
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

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
  VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    // change query method?
    const rows = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
};
