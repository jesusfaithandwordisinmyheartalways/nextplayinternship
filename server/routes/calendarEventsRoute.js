

import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

const logError = (label, err) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`${label}:`, err);
  } else {
    console.error(`${label}: An error occurred`);
  }
};



router.get('/calendar-events', async (req, res) => {
  try {
    const events = await Event.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(events);
  } catch (err) {
    logError('Fetch error', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/create-event', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    req.app.locals.io.emit('calendarChange');
    res.status(201).json(newEvent);
  } catch (err) {
    logError('Create error', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.put('/update-event/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.app.locals.io.emit('calendarChange');
    res.status(200).json(updated);
  } catch (err) {
    logError('Update error', err);
    res.status(500).json({ error: 'Failed to update event' });
  }
});


router.delete('/delete-event/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    req.app.locals.io.emit('calendarChange');
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    logError('Delete error', err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;