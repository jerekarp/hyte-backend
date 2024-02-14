import {
    listAllEntries,
    findEntryById,
    addEntry,
    deleteEntryById,
    updateEntryById,
  } from '../models/entry-model.mjs';

  const getEntries = async (req, res) => {
    try {
        const result = await listAllEntries();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await findEntryById(id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const postEntry = async (req, res) => {
    const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
    if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
      const result = await addEntry(req.body);
      if (result.entry_id) {
        res.status(201);
        res.json({message: 'New entry added.', ...result});
      } else {
        res.status(500);
        res.json(result);
      }
    } else {
      res.sendStatus(400);
    }
  };

  const putEntry = async (req, res) => {
    const { id } = req.params;
    const { mood, weight, sleep_hours, notes, created_at } = req.body;
    // Check that all needed fields are included in request
    if (!id || !mood || !weight || !sleep_hours || !notes || !created_at) {
        return res.status(400).json({ error: 'Bad Request: Missing entry ID, mood, weight, sleep_hours, notes, or created_at' });
    }

    try {
        const result = await updateEntryById(id, { mood, weight, sleep_hours, notes, created_at });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteEntry = async (req, res) => {
    const { id } = req.params;
    // Check if entry ID is provided
    if (!id) {
        return res.status(400).json({ error: 'Bad Request: Missing entry ID' });
    }

    try {
        const result = await deleteEntryById(id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
