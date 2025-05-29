


import rateLimit from "express-rate-limit";



export const adminRecoveryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    keyGenerator: (req) => req.body.email,
    handler: (req, res) => {
      const lockedUntil = Date.now() + 15 * 60 * 1000;
      res.status(429).json({
        success: false,
        message: 'Too many attempts. Try again after 15 minutes.',
        lockedUntil
      });
    }
  });


