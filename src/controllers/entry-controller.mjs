import {
    listAllEntries,
    selectEntryById,
    updateEntryById,
    deleteEntryById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
    try {
        const result = await listAllEntries();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await selectEntryById(id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateEntry = async (req, res) => {
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

export { getEntries, getEntry, updateEntry, deleteEntry };
