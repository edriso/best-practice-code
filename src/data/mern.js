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

    // ─── Section 11: WebSockets & Real-Time (Socket.io) ─────────────
    {
      id: 'websockets',
      title: 'WebSockets & Real-Time (Socket.io)',
      blocks: [
        {
          type: 'text',
          content:
            'Socket.io enables real-time, bidirectional communication between the client and server. Use it for chat, live notifications, collaborative editing, and live dashboards.',
        },
        {
          type: 'heading',
          content: 'Server Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/server.js',
          code: `const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(\`User connected: \${socket.userId}\`);

  // Join a room (e.g., chat room, user-specific room)
  socket.join(\`user:\${socket.userId}\`);

  socket.on('sendMessage', async (data) => {
    const message = await Message.create({
      text: data.text,
      sender: socket.userId,
      room: data.roomId,
    });
    // Broadcast to room
    io.to(data.roomId).emit('newMessage', message);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log(\`User disconnected: \${socket.userId}\`);
  });
});

// Make io accessible in routes for sending events from API handlers
app.set('io', io);

httpServer.listen(process.env.PORT || 3000);`,
        },
        {
          type: 'heading',
          content: 'Client Hook',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/hooks/useSocket.js',
          code: `import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';

export function useSocket(token) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(SERVER_URL, {
      auth: { token },
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  return socketRef;
}`,
        },
        {
          type: 'heading',
          content: 'Using in a Chat Component',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/features/chat/ChatRoom.jsx',
          code: `import { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useUser } from '../auth/useUser';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const socketRef = useSocket(user?.token);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit('joinRoom', roomId);
    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [roomId, socketRef]);

  function sendMessage(text) {
    socketRef.current?.emit('sendMessage', { text, roomId });
  }

  return (
    <div>
      {messages.map((msg) => (
        <p key={msg._id}>{msg.text}</p>
      ))}
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Emitting from API Routes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/orderController.js',
          code: `// Send real-time notification from a REST endpoint
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Notify the user via WebSocket
  const io = req.app.get('io');
  io.to(\`user:\${order.userId}\`).emit('orderUpdate', {
    orderId: order._id,
    status: order.status,
  });

  res.status(200).json({ status: 'success', data: { order } });
});`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Socket.io automatically falls back to HTTP long-polling if WebSocket isn\'t available. For production, use the Redis adapter (@socket.io/redis-adapter) to share events across multiple server instances.',
        },
      ],
    },

    // ─── Section 12: Caching with Redis ─────────────────────────────
    {
      id: 'caching',
      title: 'Caching with Redis',
      blocks: [
        {
          type: 'text',
          content:
            'Redis is an in-memory data store used for caching API responses, session storage, and rate limiting. Caching frequently-read data dramatically reduces database load and response times.',
        },
        {
          type: 'heading',
          content: 'Redis Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/redis.js',
          code: `const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Redis connected'));

redisClient.connect();

module.exports = redisClient;`,
        },
        {
          type: 'heading',
          content: 'Cache Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/middleware/cache.js',
          code: `const redis = require('../utils/redis');

const cache = (keyPrefix, ttlSeconds = 3600) => async (req, res, next) => {
  const key = \`\${keyPrefix}:\${req.originalUrl}\`;

  try {
    const cached = await redis.get(key);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
  } catch (err) {
    console.error('Cache read error:', err);
  }

  // Store original json method to intercept the response
  const originalJson = res.json.bind(res);
  res.json = async (data) => {
    try {
      await redis.setEx(key, ttlSeconds, JSON.stringify(data));
    } catch (err) {
      console.error('Cache write error:', err);
    }
    return originalJson(data);
  };

  next();
};

module.exports = cache;`,
        },
        {
          type: 'heading',
          content: 'Using the Cache',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/routes/tourRoutes.js',
          code: `const cache = require('../middleware/cache');

// Cache tour list for 5 minutes
router.get('/', cache('tours', 300), tourController.getAllTours);

// Cache single tour for 10 minutes
router.get('/:id', cache('tour', 600), tourController.getTour);`,
        },
        {
          type: 'heading',
          content: 'Cache Invalidation',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/clearCache.js',
          code: `const redis = require('./redis');

async function clearCache(pattern) {
  const keys = [];
  for await (const key of redis.scanIterator({ MATCH: \`\${pattern}:*\` })) {
    keys.push(key);
  }
  if (keys.length > 0) {
    await redis.del(keys);
  }
}

module.exports = clearCache;

// Usage in controller after mutation:
exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  await clearCache('tours'); // Invalidate tours list cache
  res.status(201).json({ status: 'success', data: { tour } });
});`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Cache reads but invalidate on writes. A simple pattern: cache GET requests, clear cache on POST/PATCH/DELETE. Start with generous TTLs (5-10 minutes) and adjust based on how stale your data can be.',
        },
      ],
    },

    // ─── Section 13: Rate Limiting & Security ───────────────────────
    {
      id: 'rate-limiting',
      title: 'Rate Limiting & Security',
      blocks: [
        {
          type: 'text',
          content:
            'A production MERN app needs multiple layers of security: rate limiting to prevent abuse, input sanitization to prevent injection, and security headers to prevent common attacks.',
        },
        {
          type: 'heading',
          content: 'Full Security Middleware Stack',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/app.js',
          code: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

// Security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many attempts, please try again in an hour.',
});
app.use('/api/v1/users/login', authLimiter);
app.use('/api/v1/users/forgotPassword', authLimiter);

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'price', 'difficulty', 'ratingsAverage'],
  })
);`,
        },
        {
          type: 'heading',
          content: 'Content Security Policy (for serving React)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// When serving React build from Express
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.yourdomain.com', 'wss://api.yourdomain.com'],
    },
  })
);`,
        },
        {
          type: 'heading',
          content: 'Security Packages',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'helmet',
              description: 'Sets security HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.)',
            },
            {
              name: 'express-rate-limit',
              description: 'Rate limiting middleware — limits requests per IP per time window',
            },
            {
              name: 'express-mongo-sanitize',
              description: 'Prevents NoSQL injection by stripping $ and . from user input',
            },
            {
              name: 'hpp',
              description: 'Prevents HTTP parameter pollution attacks',
            },
            {
              name: 'cors',
              description: 'Controls cross-origin access — restrict to your frontend domain',
            },
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always validate and sanitize on the server — never trust the client. Frontend validation is for UX, backend validation is for security.',
        },
      ],
    },

    // ─── Section 14: Image Upload & Optimization ────────────────────
    {
      id: 'image-optimization',
      title: 'Image Upload & Optimization',
      blocks: [
        {
          type: 'text',
          content:
            'For production MERN apps, store images in cloud storage (Cloudinary or AWS S3) rather than the local filesystem. This scales, provides CDN delivery, and survives server redeployments.',
        },
        {
          type: 'heading',
          content: 'Cloudinary Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/cloudinary.js',
          code: `const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'myapp/users',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };`,
        },
        {
          type: 'heading',
          content: 'Controller with Cloudinary',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/userController.js',
          code: `const { upload, cloudinary } = require('../utils/cloudinary');

exports.uploadPhoto = upload.single('photo');

exports.updateMe = catchAsync(async (req, res, next) => {
  const updateData = { name: req.body.name, email: req.body.email };

  // Cloudinary URL is in req.file.path after upload
  if (req.file) {
    updateData.photo = req.file.path;

    // Delete old photo from Cloudinary
    const user = await User.findById(req.user.id);
    if (user.photo && user.photo.includes('cloudinary')) {
      const publicId = user.photo.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', data: { user: updatedUser } });
});`,
        },
        {
          type: 'heading',
          content: 'AWS S3 Alternative',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/s3.js',
          code: `const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(fileBuffer, mimetype) {
  const key = \`users/\${crypto.randomUUID()}.\${mimetype.split('/')[1]}\`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  }));

  return \`https://\${process.env.AWS_BUCKET_NAME}.s3.\${process.env.AWS_REGION}.amazonaws.com/\${key}\`;
}

async function deleteFromS3(url) {
  const key = new URL(url).pathname.slice(1);
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }));
}

module.exports = { uploadToS3, deleteFromS3 };`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Cloudinary is simpler (built-in transformations, CDN) and great for small-to-medium apps. S3 gives more control and is cheaper at scale. Both are far better than storing images on your server filesystem.',
        },
      ],
    },

    // ─── Section 15: Payment Integration ────────────────────────────
    {
      id: 'payments',
      title: 'Payment Integration',
      blocks: [
        {
          type: 'text',
          content:
            'Stripe is the standard for payment processing in MERN apps. The pattern: create a checkout session on the backend, redirect the user to Stripe\'s hosted payment page, handle the result via webhooks.',
        },
        {
          type: 'heading',
          content: 'Backend: Create Checkout Session',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/bookingController.js',
          code: `const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: \`\${process.env.CLIENT_URL}/bookings?success=true\`,
    cancel_url: \`\${process.env.CLIENT_URL}/tour/\${tour.id}\`,
    customer_email: req.user.email,
    client_reference_id: tour.id,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: tour.name,
            description: tour.summary,
            images: [\`\${process.env.CLIENT_URL}/img/tours/\${tour.imageCover}\`],
          },
          unit_amount: tour.price * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({ status: 'success', session });
});`,
        },
        {
          type: 'heading',
          content: 'Backend: Webhook Handler',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/bookingController.js',
          code: `// IMPORTANT: Use raw body for webhook verification
// In app.js, BEFORE express.json():
// app.post('/webhook-checkout', express.raw({ type: 'application/json' }), bookingController.webhookCheckout);

exports.webhookCheckout = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(\`Webhook error: \${err.message}\`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const tourId = session.client_reference_id;
    const user = await User.findOne({ email: session.customer_email });

    await Booking.create({
      tour: tourId,
      user: user._id,
      price: session.amount_total / 100,
    });
  }

  res.status(200).json({ received: true });
};`,
        },
        {
          type: 'heading',
          content: 'Frontend: Redirect to Checkout',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'client/src/features/bookings/useCheckout.js',
          code: `export function useCheckout() {
  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: async (tourId) => {
      const res = await fetch(
        \`\${API_URL}/bookings/checkout-session/\${tourId}\`,
        { credentials: 'include' }
      );
      const { session } = await res.json();
      // Redirect to Stripe's hosted checkout
      window.location.href = session.url;
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isLoading };
}

// Usage:
// <button onClick={() => checkout(tour._id)}>Book Now</button>`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never trust the client for payment amounts — always calculate prices on the server. Use webhooks (not success_url) to confirm payments, as users can close the browser before being redirected back.',
        },
      ],
    },

    // ─── Section 16: Email Sending ──────────────────────────────────
    {
      id: 'email',
      title: 'Email Sending',
      blocks: [
        {
          type: 'text',
          content:
            'Use Nodemailer for sending emails in development (with Mailtrap) and production (with SendGrid, Mailgun, or Brevo). Create a reusable Email class that handles templates and different providers.',
        },
        {
          type: 'heading',
          content: 'Reusable Email Class',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/utils/email.js',
          code: `const nodemailer = require('nodemailer');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = \`MyApp <\${process.env.EMAIL_FROM}>\`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // Mailtrap (development)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      'Welcome to MyApp!',
      \`Hi \${this.firstName}, welcome! Get started here: \${this.url}\`
    );
  }

  async sendPasswordReset() {
    await this.send(
      'Password Reset (valid for 10 minutes)',
      \`Forgot your password? Reset it here: \${this.url}\\n\\nIf you didn't request this, please ignore this email.\`
    );
  }

  async sendOrderConfirmation(order) {
    await this.send(
      \`Order Confirmation #\${order._id}\`,
      \`Hi \${this.firstName}, your order of $\${order.price} has been confirmed!\`
    );
  }
}

module.exports = Email;`,
        },
        {
          type: 'heading',
          content: 'Using in Controllers',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server/controllers/authController.js',
          code: `const Email = require('../utils/email');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = \`\${process.env.CLIENT_URL}/me\`;
  await new Email(user, url).sendWelcome();

  createSendToken(user, 201, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No user found with that email.', 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = \`\${process.env.CLIENT_URL}/reset-password/\${resetToken}\`;

  try {
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({ status: 'success', message: 'Token sent to email!' });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('Error sending email. Try again later.', 500));
  }
});`,
        },
        {
          type: 'heading',
          content: 'Environment Variables',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'server/config.env',
          code: `# Development (Mailtrap)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=your_mailtrap_user
EMAIL_PASSWORD=your_mailtrap_pass

# Production (SendGrid)
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD=SG.your_api_key_here

EMAIL_FROM=noreply@myapp.com`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use Mailtrap in development — it catches all emails without sending them to real addresses. In production, SendGrid offers 100 free emails/day. For high volume, consider a queue (Bull + Redis) to send emails in the background.',
        },
      ],
    },
  ],
}

export default mernData
