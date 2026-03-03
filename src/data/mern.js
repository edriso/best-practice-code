const mernData = {
  id: 'mern',
  name: 'MERN Stack',
  description: 'Full-stack architecture, project structure, and integration patterns for MongoDB, Express, React, and Node.js',
  sections: [
    // ─── Section 1: Project Structure ─────────────────────────────────
    {
      id: 'project-structure',
      title: 'Project Structure',
      blocks: [
        {
          type: 'text',
          content:
            'A MERN project typically uses a monorepo with separate client and server directories, or two independent repos. The monorepo approach is simpler for solo/small-team projects.',
        },
        {
          type: 'heading',
          content: 'Monorepo Structure',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'mern-project',
            children: [
              {
                name: 'client',
                comment: 'React frontend (Vite)',
                children: [
                  {
                    name: 'src',
                    children: [
                      { name: 'features', comment: 'Feature modules' },
                      { name: 'ui', comment: 'Shared UI components' },
                      { name: 'services', comment: 'API call functions' },
                      { name: 'hooks', comment: 'Custom hooks' },
                      { name: 'pages', comment: 'Route components' },
                      { name: 'utils', comment: 'Helper functions' },
                      { name: 'App.jsx' },
                      { name: 'main.jsx' },
                    ],
                  },
                  { name: 'package.json' },
                  { name: 'vite.config.js' },
                ],
              },
              {
                name: 'server',
                comment: 'Express backend',
                children: [
                  { name: 'controllers', comment: 'Route handlers' },
                  { name: 'models', comment: 'Mongoose schemas' },
                  { name: 'routes', comment: 'Express routers' },
                  { name: 'middleware', comment: 'Auth, error handling' },
                  { name: 'utils', comment: 'AppError, catchAsync, email' },
                  { name: 'app.js', comment: 'Express config' },
                  { name: 'server.js', comment: 'DB + listen' },
                  { name: 'package.json' },
                ],
              },
              { name: '.gitignore' },
              { name: 'package.json', comment: 'Root scripts (optional)' },
            ],
          },
        },
        {
          type: 'heading',
          content: 'Root package.json Scripts',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json (root)',
          code: `{
  "scripts": {
    "client": "npm run dev --prefix client",
    "server": "npm run dev --prefix server",
    "dev": "concurrently \\"npm run server\\" \\"npm run client\\"",
    "install-all": "npm install && npm install --prefix client && npm install --prefix server",
    "build": "npm run build --prefix client"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use concurrently to run both servers with a single command. The --prefix flag runs npm commands in subdirectories.',
        },
      ],
    },

    // ─── Section 2: API Design & Communication ────────────────────────
    {
      id: 'api-design',
      title: 'API Design & Communication',
      blocks: [
        {
          type: 'text',
          content:
            'The frontend and backend communicate via a RESTful JSON API. Keep a consistent response format and use a centralized API service layer on the frontend.',
        },
        {
          type: 'heading',
          content: 'Consistent Response Format',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server — response convention',
          code: `// Success (single document)
res.status(200).json({ status: 'success', data: { user } });

// Success (list)
res.status(200).json({ status: 'success', results: tours.length, data: { tours } });

// Created
res.status(201).json({ status: 'success', data: { tour } });

// Deleted (no body)
res.status(204).json({ status: 'success', data: null });

// Error
res.status(404).json({ status: 'fail', message: 'Not found' });`,
        },
        {
          type: 'heading',
          content: 'Frontend API Service Layer',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/src/services/apiTours.js',
          code: `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export async function getTours() {
  const res = await fetch(\`\${API_URL}/tours\`);
  if (!res.ok) throw new Error('Failed to fetch tours');
  const { data } = await res.json();
  return data.tours;
}

export async function createTour(tourData) {
  const res = await fetch(\`\${API_URL}/tours\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Send cookies for auth
    body: JSON.stringify(tourData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  const { data } = await res.json();
  return data.tour;
}`,
        },
        {
          type: 'heading',
          content: 'React Query Integration',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/features/tours/useTours.js',
          code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTours, createTour } from '../../services/apiTours';

export function useTours() {
  const { isLoading, data: tours, error } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
  });
  return { isLoading, tours, error };
}

export function useCreateTour() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
  return { createTour: mutate, isCreating: isLoading };
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Always set credentials: "include" in fetch when your backend uses HTTP-only cookies for auth. Without it, cookies won\'t be sent cross-origin.',
        },
      ],
    },

    // ─── Section 3: Authentication Flow ───────────────────────────────
    {
      id: 'auth-flow',
      title: 'Authentication Flow',
      blocks: [
        {
          type: 'text',
          content:
            'The full MERN auth flow: the backend creates a JWT stored in an HTTP-only cookie, the frontend checks auth status on load, and protected routes redirect unauthenticated users.',
        },
        {
          type: 'heading',
          content: 'Backend: Token in HTTP-Only Cookie',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/authController.js',
          code: `const jwt = require('jsonwebtoken');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  user.password = undefined;
  res.status(statusCode).json({ status: 'success', data: { user } });
};`,
        },
        {
          type: 'heading',
          content: 'Backend: CORS Config for Credentials',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/app.js',
          code: `const cors = require('cors');

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies
}));`,
        },
        {
          type: 'heading',
          content: 'Frontend: Auth Hook',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/features/auth/useUser.js',
          code: `import { useQuery } from '@tanstack/react-query';

async function getCurrentUser() {
  const res = await fetch(\`\${API_URL}/users/me\`, {
    credentials: 'include',
  });
  if (!res.ok) return null;
  const { data } = await res.json();
  return data.user;
}

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { isLoading, user, isAuthenticated: !!user };
}`,
        },
        {
          type: 'heading',
          content: 'Frontend: Protected Route',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/ui/ProtectedRoute.jsx',
          code: `import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../features/auth/useUser';

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'sameSite: "none" requires secure: true. In development (HTTP), use sameSite: "lax". Conditionally set based on NODE_ENV.',
        },
      ],
    },

    // ─── Section 4: Environment & Config ──────────────────────────────
    {
      id: 'environment',
      title: 'Environment & Config',
      blocks: [
        {
          type: 'text',
          content:
            'Both client and server have their own environment variables. Never expose server secrets to the frontend — Vite only exposes variables prefixed with VITE_.',
        },
        {
          type: 'heading',
          content: 'Server .env',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'server/config.env',
          code: `NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173

DATABASE=mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/mydb
DATABASE_PASSWORD=your_password

JWT_SECRET=your-ultra-secure-secret-minimum-32-chars
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90`,
        },
        {
          type: 'heading',
          content: 'Client .env',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'client/.env',
          code: `# Only VITE_ prefixed vars are exposed to the browser
VITE_API_URL=http://localhost:3000/api/v1`,
        },
        {
          type: 'heading',
          content: 'Vite Proxy (Alternative to CORS)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/vite.config.js',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The Vite proxy is only for development. In production, both apps are usually behind the same domain (or use proper CORS). The proxy avoids CORS issues during local development.',
        },
      ],
    },

    // ─── Section 5: Database Design ───────────────────────────────────
    {
      id: 'database',
      title: 'Database Design',
      blocks: [
        {
          type: 'text',
          content:
            'MongoDB with Mongoose provides flexible schemas. Choose between embedding (subdocuments) and referencing (population) based on data access patterns.',
        },
        {
          type: 'heading',
          content: 'Embedding vs Referencing',
        },
        {
          type: 'list',
          items: [
            'Embed when: data is always accessed together, rarely changes independently, is small (e.g., addresses in user)',
            'Reference when: data is accessed independently, is shared across documents, is large or grows unbounded (e.g., reviews on tour)',
            'Hybrid: embed IDs for quick lookup, populate when full data is needed (e.g., tour.guides)',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Referencing (parent referencing)',
          code: `// Review references its parent Tour and User
const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Unique compound index: one review per user per tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Child referencing + virtual populate',
          code: `// Tour doesn't store review IDs — uses virtual populate instead
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Usage: Tour.findById(id).populate('reviews')`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Prefer parent referencing (child stores parent ID) over child referencing (parent stores array of child IDs). Arrays grow unbounded and hurt performance.',
        },
      ],
    },

    // ─── Section 6: Error Handling (Full Stack) ───────────────────────
    {
      id: 'error-handling',
      title: 'Error Handling (Full Stack)',
      blocks: [
        {
          type: 'text',
          content:
            'Errors flow from backend through the API to the frontend. Handle them at every layer: Express middleware, API service, and React UI.',
        },
        {
          type: 'heading',
          content: 'Backend: AppError + catchAsync',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/appError.js',
          code: `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/catchAsync.js',
          code: `module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};`,
        },
        {
          type: 'heading',
          content: 'Frontend: API Error Extraction',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'client/src/services/apiHelper.js',
          code: `export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}`,
        },
        {
          type: 'heading',
          content: 'Frontend: Toast Notifications',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { toast } from 'react-hot-toast';

// In mutation hooks:
const { mutate } = useMutation({
  mutationFn: deleteTour,
  onSuccess: () => toast.success('Tour deleted'),
  onError: (err) => toast.error(err.message),
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The error message flows: AppError on backend → JSON response → fetch throws → React Query onError → toast to user. Each layer preserves the message.',
        },
      ],
    },

    // ─── Section 7: File Uploads ──────────────────────────────────────
    {
      id: 'file-uploads',
      title: 'File Uploads',
      blocks: [
        {
          type: 'text',
          content:
            'File uploads go from the React frontend via multipart/form-data to Express with Multer, then optionally processed with Sharp and stored locally or in cloud storage.',
        },
        {
          type: 'heading',
          content: 'Frontend: FormData Upload',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client — upload component',
          code: `function UpdateUserForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('photo', photoFile); // File object from input

    const res = await fetch(\`\${API_URL}/users/updateMe\`, {
      method: 'PATCH',
      credentials: 'include',
      body: form, // Don't set Content-Type — browser adds multipart boundary
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*"
        onChange={(e) => setPhotoFile(e.target.files[0])}
      />
    </form>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Backend: Multer + Sharp',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/userController.js',
          code: `const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new AppError('Not an image!', 400), false);
  },
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = \`user-\${req.user.id}-\${Date.now()}.jpeg\`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(\`public/img/users/\${req.file.filename}\`);

  next();
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Don\'t set Content-Type header when sending FormData — the browser sets it automatically with the correct multipart boundary. Setting it manually breaks the upload.',
        },
      ],
    },

    // ─── Section 8: Deployment ────────────────────────────────────────
    {
      id: 'deployment',
      title: 'Deployment',
      blocks: [
        {
          type: 'text',
          content:
            'Deploy the frontend and backend separately, or serve the React build from Express. Common setups: Vercel/Netlify for frontend + Railway/Render for backend, or a single server serving both.',
        },
        {
          type: 'heading',
          content: 'Option 1: Serve React from Express',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/app.js — serve client build',
          code: `const path = require('path');

// After all API routes...
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}`,
        },
        {
          type: 'heading',
          content: 'Option 2: Separate Deployments',
        },
        {
          type: 'list',
          items: [
            'Frontend (Netlify/Vercel): Build with VITE_API_URL pointing to backend URL. Add _redirects file: /* /index.html 200',
            'Backend (Railway/Render): Set environment variables, enable auto-deploy from git, set CLIENT_URL for CORS',
            'DNS: Point frontend to frontend host, API requests go to backend URL',
          ],
        },
        {
          type: 'heading',
          content: 'Production Checklist',
        },
        {
          type: 'list',
          items: [
            'Set NODE_ENV=production on backend',
            'Set VITE_API_URL to production backend URL on frontend',
            'Configure CORS origin to frontend domain',
            'Enable compression middleware',
            'Set secure: true on JWT cookie',
            'Set sameSite: "none" on JWT cookie (cross-origin) or "strict" (same origin)',
            'Add rate limiting on API routes',
            'Enable all security middleware (helmet, mongoSanitize, hpp)',
            'Add _redirects or configure SPA routing on frontend host',
            'Set trust proxy if behind a reverse proxy',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Serving React from Express is simplest — one deployment, no CORS issues, shared domain for cookies. But separate deployments scale better and allow independent releases.',
        },
      ],
    },

    // ─── Section 9: Folder Naming & Conventions ───────────────────────
    {
      id: 'conventions',
      title: 'Naming & Conventions',
      blocks: [
        {
          type: 'text',
          content:
            'Consistent naming across the stack makes the codebase navigable. Follow these conventions for a MERN project.',
        },
        {
          type: 'heading',
          content: 'Backend Conventions',
        },
        {
          type: 'list',
          items: [
            'Files: camelCase (tourController.js, userModel.js)',
            'Models: PascalCase singular (Tour, User, Review)',
            'Routes: plural (tours, users, reviews)',
            'API paths: /api/v1/[resource] with versioning',
            'Environment: config.env or .env at server root',
            'Middleware: named after what it does (protect, restrictTo, uploadPhoto)',
          ],
        },
        {
          type: 'heading',
          content: 'Frontend Conventions',
        },
        {
          type: 'list',
          items: [
            'Components: PascalCase (TourCard.jsx, LoginForm.jsx)',
            'Hooks: camelCase with "use" prefix (useTours.js, useUser.js)',
            'Services: camelCase with "api" prefix (apiTours.js, apiAuth.js)',
            'Pages: PascalCase (Dashboard.jsx, Login.jsx)',
            'Directories: lowercase (features, hooks, pages, services, ui)',
          ],
        },
        {
          type: 'heading',
          content: 'Shared Patterns',
        },
        {
          type: 'list',
          items: [
            'One resource = one model, one controller, one route file, one service file, one hook',
            'Backend exports with module.exports / require (CommonJS)',
            'Frontend uses import / export (ES Modules)',
            'Both use .env files (server: dotenv, client: Vite built-in)',
          ],
        },
      ],
    },

    // ─── Section 10: Testing & Development ────────────────────────────
    {
      id: 'development',
      title: 'Development Workflow',
      blocks: [
        {
          type: 'text',
          content:
            'A smooth development workflow means running both servers simultaneously, using hot reload, and testing endpoints easily.',
        },
        {
          type: 'heading',
          content: 'Development Setup',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Terminal 1: Backend (auto-restarts on changes)
cd server && npm run dev   # nodemon server.js

# Terminal 2: Frontend (HMR via Vite)
cd client && npm run dev   # vite

# Or from root with concurrently:
npm run dev`,
        },
        {
          type: 'heading',
          content: 'API Testing with VS Code REST Client',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'requests.http',
          code: `### Login
POST http://localhost:3000/api/v1/users/login
Content-Type: application/json

{
  "email": "test@test.com",
  "password": "password123"
}

### Get All Tours
GET http://localhost:3000/api/v1/tours

### Create Tour (authenticated)
POST http://localhost:3000/api/v1/tours
Content-Type: application/json

{
  "name": "Test Tour",
  "duration": 5,
  "difficulty": "easy",
  "price": 299
}`,
        },
        {
          type: 'heading',
          content: 'Git Workflow',
        },
        {
          type: 'list',
          items: [
            'Single .gitignore at root covering both client and server',
            'node_modules/, .env, config.env, dist/ in .gitignore',
            'Feature branches: feature/auth-flow, feature/tour-crud',
            'Commit frequently with descriptive messages per feature',
          ],
        },
        {
          type: 'code',
          language: 'text',
          fileName: '.gitignore',
          code: `node_modules/
dist/
.env
config.env
*.env.local
.DS_Store`,
        },
      ],
    },
  ],
}

export default mernData
