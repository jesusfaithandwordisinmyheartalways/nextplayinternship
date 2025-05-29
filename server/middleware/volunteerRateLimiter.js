



import rateLimit from 'express-rate-limit';

const volunteerRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: 'Too many volunteer submissions. Please try again after 24 hours.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default volunteerRateLimiter;