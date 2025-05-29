




import rateLimit from 'express-rate-limit'



export const donateRequestLimit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 5, 
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: " to many donation request. Please try again tomorrow."
    }
});