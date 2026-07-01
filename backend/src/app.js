import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import notFound from './middleware/notFound.middleware.js';
import errorHandler from './middleware/error.middleware.js';
import routes from './routes/index.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Test/Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is healthy and running',
    timestamp: new Date()
  });
});

// API routes
app.use('/api/v1', routes);

// 404 handler for unhandled routes
app.use(notFound);

// Global error handling middleware
app.use(errorHandler);

export default app;
