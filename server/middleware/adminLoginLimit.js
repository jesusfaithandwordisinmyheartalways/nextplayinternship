



import rateLimit from 'express-rate-limit';




export const adminLoginRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 24 hours.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

