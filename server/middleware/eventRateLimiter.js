



import rateLimit from 'express-rate-limit';

export const eventRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3, 
  message: {
    success: false,
    message: 'Too many event submissions. Please try again after 24 hours.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

