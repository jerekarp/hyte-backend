import {validationResult} from 'express-validator';
import {
    listAllEntries,
    findEntryById,
    addEntry,
    deleteEntryById,
    updateEntryById,
    listAllEntriesByUserId,
  } from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  try {
    // Varmistetaan, että käyttäjä on todennettu
    if (!req.user) {
      return res.status(401).json({virhe: 'Unauthorized'});
    }

    // Haetaan käyttäjän tunnus tokenista
    const userId = req.user.user_id;

    // Haetaan kirjaukset kirjautuneelle käyttäjälle
    const result = await listAllEntriesByUserId(userId);

    // Jos kyselyssä ei tapahtunut virheitä, lähetetään vastaus kirjauksista
    res.json(result);
  } catch (error) {
    // Jos virhe tapahtuu hakuprosessin aikana.
    res.status(500).json({virhe: 'Server error'});
  }
};

const getEntryById = async (req, res) => {
  // Authentication: Check if user is authenticated
  if (!req.user) {
    return res.sendStatus(401); // Unauthorized
  }

  // Retrieve entry by id
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404); // Not Found
  }
};

const postEntry = async (req, res, next) => {
  const { user_id, entry_date, mood, weight, sleep_hours, notes } = req.body;

  const validationErrors = validationResult(req);
  console.log('entry validation errors', validationErrors);
  if (validationErrors.isEmpty()) {
    if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
      const result = await addEntry(req.body);
      if (result.entry_id) {
        res.status(201).json({ message: 'New entry added.', ...result });
      } else {
        res.status(500).json(result);
      }
    } else {
      res.sendStatus(400);
    }
}};

const putEntry = async (req, res) => {
  const { id } = req.params;
  const { mood, weight, sleep_hours, notes, created_at } = req.body;

  // Tarkista, että kaikki tarvittavat kentät sisältyvät pyyntöön
  if (!id || !mood || !weight || !sleep_hours || !notes || !created_at) {
      return res.status(400).json({ error: 'Bad Request: Missing entry ID, mood, weight, sleep_hours, notes, or created_at' });
  }

  console.log(id)
  console.log(req.user)

  try {
      // Tarkista, että käyttäjä on kirjautunut sisään
      if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized: User not logged in' });
      }

      // Haetaan tietue tietokannasta
      const entry = await findEntryById(id);
      if (!entry) {
          return res.status(404).json({ error: 'Entry not found' });
      }

      // Tarkista, että käyttäjä on tietueen omistaja
      if (entry.user_id !== req.user.id) {
          return res.status(403).json({ error: 'Not authorized to update this entry' });
      }

      // Käyttäjä on tietueen omistaja, suorita päivitys
      const result = await updateEntryById(id, { mood, weight, sleep_hours, notes, created_at });
      return res.status(200).json(result);
  } catch (error) {
      console.error(error);
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
