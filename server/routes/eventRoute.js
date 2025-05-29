




import express from 'express';
import registerEvent from '../controllers/registerEvent.js';



const router = express.Router()
router.post('/events', registerEvent)



export default router