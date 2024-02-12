import express from 'express';
import {
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';

const entryRouter = express.Router();


entryRouter.route('/')
  .get(getEntries)

entryRouter.route('/:id')
  .get(getEntry)
  .put(updateEntry)
  .delete(deleteEntry);

export default entryRouter;
