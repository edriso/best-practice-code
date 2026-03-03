const expressData = {
  id: 'express',
  name: 'Express.js',
  description: 'Best practices, patterns, and conventions for Express.js applications',
  sections: [
    // ─── Section 1: Project Setup & Folder Structure ─────────────────
    {
      id: 'project-setup',
      title: 'Project Setup & Folder Structure',
      blocks: [
        {
          type: 'text',
          content:
            'A well-organized Express.js project follows the MVC (Model-View-Controller) pattern. Separate your server bootstrapping (server.js) from your Express app configuration (app.js).',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'project-root',
            children: [
              {
                name: 'controllers',
                comment: 'Route handlers / business logic',
                children: [
                  { name: 'authController.js' },
                  { name: 'errorController.js' },
                  { name: 'handlerFactory.js', comment: 'Generic CRUD factory' },
                  { name: 'tourController.js' },
                  { name: 'userController.js' },
                  { name: 'reviewController.js' },
                ],
              },
              {
                name: 'models',
                comment: 'Mongoose schemas & models',
                children: [
                  { name: 'tourModel.js' },
                  { name: 'userModel.js' },
                  { name: 'reviewModel.js' },
                ],
              },
              {
                name: 'routes',
                comment: 'Express Router definitions',
                children: [
                  { name: 'tourRoutes.js' },
                  { name: 'userRoutes.js' },
                  { name: 'reviewRoutes.js' },
                ],
              },
              {
                name: 'utils',
                comment: 'Reusable utility classes/functions',
                children: [
                  { name: 'appError.js', comment: 'Custom error class' },
                  { name: 'catchAsync.js', comment: 'Async error wrapper' },
                  { name: 'apiFeatures.js', comment: 'Query builder' },
                  { name: 'email.js', comment: 'Email service' },
                ],
              },
              {
                name: 'public',
                comment: 'Static files (images, CSS)',
                children: [
                  { name: 'img', children: [] },
                  { name: 'css', children: [] },
                ],
              },
              { name: 'app.js', comment: 'Express app configuration' },
              { name: 'server.js', comment: 'Server bootstrap & DB connection' },
              { name: 'config.env', comment: 'Environment variables' },
              { name: 'package.json' },
              { name: '.eslintrc.json' },
              { name: '.gitignore' },
            ],
          },
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Keep server.js minimal — only DB connection, server listening, and process-level error handlers. All Express config (middleware, routes) goes in app.js.',
        },
        {
          type: 'heading',
          content: 'server.js vs app.js Separation',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js',
          code: `const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions (MUST be at the top)
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(\`App running on port \${port}...\`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully.');
  server.close(() => console.log('Process terminated.'));
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'The uncaughtException handler must be registered before any other code runs. If it\'s placed after a synchronous error occurs, it won\'t catch it.',
        },
        {
          type: 'heading',
          content: 'Naming Conventions',
        },
        {
          type: 'list',
          items: [
            'Files: camelCase (tourController.js, userModel.js)',
            'Models: PascalCase singular (Tour, User, Review)',
            'Routes: plural (tours, users, reviews)',
            'Controllers: [resource]Controller.js pattern',
            'Environment: config.env or .env at project root',
          ],
        },
      ],
    },

    // ─── Section 2: Essential Packages ────────────────────────────────
    {
      id: 'essential-packages',
      title: 'Essential Packages',
      blocks: [
        {
          type: 'text',
          content:
            'A production-ready Express.js app typically needs these core packages. Install them as needed — don\'t add packages you won\'t use.',
        },
        {
          type: 'heading',
          content: 'Core Framework',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'express',
              description: 'Web framework for Node.js — routing, middleware, HTTP utilities',
              url: 'https://expressjs.com',
            },
            {
              name: 'mongoose',
              description: 'MongoDB ODM — schemas, validation, queries, middleware hooks',
              url: 'https://mongoosejs.com',
            },
            {
              name: 'dotenv',
              description: 'Loads environment variables from .env file into process.env',
              url: 'https://github.com/motdotla/dotenv',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Security',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'helmet',
              description: 'Sets security HTTP headers (CSP, HSTS, X-Frame, etc.)',
              url: 'https://helmetjs.github.io',
            },
            {
              name: 'express-rate-limit',
              description: 'Rate limiting middleware to prevent brute-force attacks',
              url: 'https://github.com/express-rate-limit/express-rate-limit',
            },
            {
              name: 'express-mongo-sanitize',
              description: 'Prevents NoSQL injection by sanitizing user input',
              url: 'https://github.com/fiznool/express-mongo-sanitize',
            },
            {
              name: 'hpp',
              description: 'Protects against HTTP parameter pollution attacks',
              url: 'https://github.com/analog-nico/hpp',
            },
            {
              name: 'cors',
              description: 'Enables Cross-Origin Resource Sharing with configurable options',
              url: 'https://github.com/expressjs/cors',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Authentication',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'jsonwebtoken',
              description: 'JWT creation and verification for stateless authentication',
              url: 'https://github.com/auth0/node-jsonwebtoken',
            },
            {
              name: 'bcryptjs',
              description: 'Password hashing with salt rounds (pure JS, no native deps)',
              url: 'https://github.com/dcodeIO/bcrypt.js',
            },
            {
              name: 'cookie-parser',
              description: 'Parses cookies from incoming requests',
              url: 'https://github.com/expressjs/cookie-parser',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Utilities',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'morgan',
              description: 'HTTP request logger middleware for development',
              url: 'https://github.com/expressjs/morgan',
            },
            {
              name: 'compression',
              description: 'Gzip compression middleware for responses',
              url: 'https://github.com/expressjs/compression',
            },
            {
              name: 'multer',
              description: 'Middleware for handling multipart/form-data (file uploads)',
              url: 'https://github.com/expressjs/multer',
            },
            {
              name: 'sharp',
              description: 'High-performance image processing (resize, format conversion)',
              url: 'https://sharp.pixelplumbing.com',
            },
            {
              name: 'nodemailer',
              description: 'Send emails from Node.js (SMTP, Sendgrid, Mailgun, etc.)',
              url: 'https://nodemailer.com',
            },
            {
              name: 'validator',
              description: 'String validation and sanitization library (isEmail, isURL, etc.)',
              url: 'https://github.com/validatorjs/validator.js',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Development',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'nodemon',
              description: 'Auto-restarts server on file changes during development',
              url: 'https://nodemon.io',
            },
            {
              name: 'eslint + prettier',
              description: 'Linting and code formatting (use Airbnb or Standard config)',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Install commands',
          code: `# Core
npm i express mongoose dotenv

# Security
npm i helmet express-rate-limit express-mongo-sanitize hpp cors

# Auth
npm i jsonwebtoken bcryptjs cookie-parser

# Utilities
npm i morgan compression multer sharp nodemailer validator

# Dev dependencies
npm i -D nodemon eslint prettier eslint-config-airbnb eslint-config-prettier`,
        },
      ],
    },

    // ─── Section 3: App & Server Setup ────────────────────────────────
    {
      id: 'app-server-setup',
      title: 'App & Server Setup',
      blocks: [
        {
          type: 'text',
          content:
            'The app.js file is the heart of your Express application. Middleware order matters — security first, then body parsing, then routes, then error handling.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Trust proxies (for Heroku, Nginx, etc.)
app.enable('trust proxy');

// CORS
app.use(cors());
app.options('*', cors()); // Preflight for all routes

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, try again in an hour!',
});
app.use('/api', limiter);

// Body parser (with size limit!)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'],
  })
);

// Compression
app.use(compression());

// Serving static files
app.use(express.static(\`\${__dirname}/public\`));

// 2) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// 3) HANDLE UNDEFINED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(\`Can't find \${req.originalUrl} on this server!\`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Middleware order matters! Security middleware (helmet, rate limiter) must come before body parsers. The error handler must be the very last middleware.',
        },
        {
          type: 'heading',
          content: 'Middleware Ordering Rule',
        },
        {
          type: 'list',
          items: [
            '1. Trust proxy & CORS',
            '2. Security headers (helmet)',
            '3. Rate limiting',
            '4. Body parsing (JSON, URL-encoded, cookies)',
            '5. Data sanitization',
            '6. Parameter pollution protection',
            '7. Compression',
            '8. Static files',
            '9. API routes',
            '10. Undefined route handler (404)',
            '11. Global error handler (last!)',
          ],
        },
        {
          type: 'heading',
          content: 'Database Connection Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js — DB connection',
          code: `const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// For local development:
// mongoose.connect('mongodb://localhost:27017/yourdb')`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Never hardcode database credentials. Always use environment variables and replace placeholders at runtime.',
        },
      ],
    },

    // ─── Section 4: Routing Best Practices ────────────────────────────
    {
      id: 'routing',
      title: 'Routing Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Use Express Router to organize routes into separate files per resource. Follow RESTful conventions and use middleware chaining for auth/validation.',
        },
        {
          type: 'heading',
          content: 'Basic Router Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'routes/tourRoutes.js',
          code: `const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Nested routes: POST /tours/:tourId/reviews → reviewRouter
router.use('/:tourId/reviews', reviewRouter);

// Public routes
router.route('/top-5-cheap').get(
  tourController.aliasTopTours, // Middleware to preset query
  tourController.getAllTours
);

router.route('/tour-stats').get(tourController.getTourStats);

// CRUD routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;`,
        },
        {
          type: 'heading',
          content: 'Nested Routes with mergeParams',
        },
        {
          type: 'text',
          content:
            'When a child resource belongs to a parent (e.g., reviews belong to a tour), use nested routes and mergeParams: true to access parent params.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'routes/reviewRoutes.js',
          code: `const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// mergeParams gives access to :tourId from parent router
const router = express.Router({ mergeParams: true });

// All review routes require authentication
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;`,
        },
        {
          type: 'heading',
          content: 'Route Aliasing Middleware',
        },
        {
          type: 'text',
          content:
            'Create middleware functions that preset query parameters for common queries. This keeps URLs clean while reusing the same controller.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/tourController.js',
          code: `// Alias middleware: presets query for "top 5 cheap" tours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Usage in router:
// router.route('/top-5-cheap').get(aliasTopTours, getAllTours);`,
        },
        {
          type: 'heading',
          content: 'Mounting Routers in app.js',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js — route mounting',
          code: `// Each resource gets its own base path
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// This means tourRouter handles:
//   GET  /api/v1/tours
//   POST /api/v1/tours
//   GET  /api/v1/tours/:id
//   ...etc`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always version your API routes (/api/v1/...). When you need breaking changes, create /api/v2/ routes while keeping v1 working.',
        },
        {
          type: 'heading',
          content: 'RESTful Route Conventions',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'RESTful routes for a resource',
          code: `GET    /api/v1/tours          → Get all tours
POST   /api/v1/tours          → Create tour
GET    /api/v1/tours/:id      → Get one tour
PATCH  /api/v1/tours/:id      → Update tour (partial)
DELETE /api/v1/tours/:id      → Delete tour

// Nested resource routes:
GET    /api/v1/tours/:tourId/reviews     → Get reviews for tour
POST   /api/v1/tours/:tourId/reviews     → Create review on tour`,
        },
      ],
    },
  ],
}

export default expressData
