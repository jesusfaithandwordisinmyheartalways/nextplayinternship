



import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET
router.get('/calendar-events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST
router.post('/create-event', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    req.app.locals.io.emit('calendarChange');
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT
router.put('/update-event/:id', async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    req.app.locals.io.emit('calendarChange');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE
router.delete('/delete-event/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    req.app.locals.io.emit('calendarChange');
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;