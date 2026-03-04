const reactData = {
  id: 'react',
  name: 'React.js',
  description: 'Best practices, patterns, and conventions for React applications',
  sections: [
    // ─── Section 1: Project Setup & Folder Structure ─────────────────
    {
      id: 'project-setup',
      title: 'Project Setup & Folder Structure',
      blocks: [
        {
          type: 'text',
          content:
            'Modern React apps use Vite for fast development and feature-based folder structure for scalability. Group files by domain feature, not by technical role.',
        },
        {
          type: 'heading',
          content: 'Feature-Based Structure (Recommended)',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'src',
            children: [
              {
                name: 'features',
                comment: 'Domain features',
                children: [
                  {
                    name: 'authentication',
                    children: [
                      { name: 'LoginForm.jsx' },
                      { name: 'useLogin.js' },
                      { name: 'useLogout.js' },
                    ],
                  },
                  {
                    name: 'cabins',
                    children: [
                      { name: 'CabinTable.jsx' },
                      { name: 'CabinRow.jsx' },
                      { name: 'CreateCabinForm.jsx' },
                      { name: 'useCabins.js' },
                      { name: 'useCreateCabin.js' },
                    ],
                  },
                  {
                    name: 'dashboard',
                    children: [
                      { name: 'DashboardLayout.jsx' },
                      { name: 'Stats.jsx' },
                      { name: 'SalesChart.jsx' },
                    ],
                  },
                ],
              },
              {
                name: 'ui',
                comment: 'Reusable UI components',
                children: [
                  { name: 'Button.jsx' },
                  { name: 'Modal.jsx' },
                  { name: 'Table.jsx' },
                  { name: 'Pagination.jsx' },
                  { name: 'Spinner.jsx' },
                  { name: 'ErrorFallback.jsx' },
                ],
              },
              {
                name: 'hooks',
                comment: 'Shared custom hooks',
                children: [
                  { name: 'useOutsideClick.js' },
                  { name: 'useLocalStorageState.js' },
                ],
              },
              {
                name: 'services',
                comment: 'API / backend calls',
                children: [
                  { name: 'apiCabins.js' },
                  { name: 'apiAuth.js' },
                  { name: 'supabase.js' },
                ],
              },
              {
                name: 'pages',
                comment: 'Route-level components',
                children: [
                  { name: 'Dashboard.jsx' },
                  { name: 'Login.jsx' },
                  { name: 'PageNotFound.jsx' },
                ],
              },
              {
                name: 'utils',
                comment: 'Helper functions',
                children: [{ name: 'helpers.js' }],
              },
              {
                name: 'styles',
                comment: 'Global styles',
                children: [{ name: 'GlobalStyles.js' }],
              },
              { name: 'App.jsx', comment: 'Root component + routing' },
              { name: 'main.jsx', comment: 'Entry point' },
            ],
          },
        },
        {
          type: 'heading',
          content: 'Simpler Structure (Small-Medium Apps)',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'src',
            children: [
              {
                name: 'components',
                comment: 'Reusable components',
                children: [
                  { name: 'CityList.jsx' },
                  { name: 'Map.jsx' },
                  { name: 'Sidebar.jsx' },
                ],
              },
              {
                name: 'contexts',
                comment: 'React Context providers',
                children: [
                  { name: 'CitiesContext.jsx' },
                  { name: 'AuthContext.jsx' },
                ],
              },
              {
                name: 'hooks',
                children: [
                  { name: 'useGeolocation.js' },
                  { name: 'useUrlPosition.js' },
                ],
              },
              {
                name: 'pages',
                children: [
                  { name: 'Homepage.jsx' },
                  { name: 'AppLayout.jsx' },
                  { name: 'Login.jsx' },
                ],
              },
              { name: 'App.jsx' },
              { name: 'main.jsx' },
            ],
          },
        },
        {
          type: 'heading',
          content: 'Naming Conventions',
        },
        {
          type: 'list',
          items: [
            'Components: PascalCase files (Button.jsx, CabinRow.jsx)',
            'Hooks: camelCase starting with "use" (useMovies.js, useOutsideClick.js)',
            'Contexts: PascalCase with "Context" suffix (CitiesContext.jsx)',
            'Services: camelCase with "api" prefix (apiCabins.js, apiAuth.js)',
            'Utils/helpers: camelCase (helpers.js, formatCurrency.js)',
          ],
        },
        {
          type: 'heading',
          content: 'Vite Project Setup',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Create new project
npm create vite@latest my-app -- --template react

# With Tailwind CSS
npm install tailwindcss @tailwindcss/vite`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Prefer feature-based structure for apps with 10+ components. It keeps related code together — a feature\'s component, hook, and API call live side-by-side.',
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
            'Pick packages based on your app\'s needs. Here are the most common packages used across production React apps.',
        },
        {
          type: 'heading',
          content: 'Routing',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'react-router-dom',
              description: 'Declarative routing with nested routes, loaders, actions, and protected routes',
              url: 'https://reactrouter.com',
            },
          ],
        },
        {
          type: 'heading',
          content: 'State Management',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@tanstack/react-query',
              description: 'Server state management — caching, background refetch, mutations, pagination',
              url: 'https://tanstack.com/query',
            },
            {
              name: '@reduxjs/toolkit',
              description: 'Global client state — slices, async thunks, devtools (with react-redux)',
              url: 'https://redux-toolkit.js.org',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Forms',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'react-hook-form',
              description: 'Performant form state management with validation, error handling, and minimal re-renders',
              url: 'https://react-hook-form.com',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Styling',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'tailwindcss',
              description: 'Utility-first CSS framework — fast prototyping, consistent design',
              url: 'https://tailwindcss.com',
            },
            {
              name: 'styled-components',
              description: 'CSS-in-JS with dynamic props, theming, and scoped styles',
              url: 'https://styled-components.com',
            },
          ],
        },
        {
          type: 'heading',
          content: 'UI & Utilities',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'react-hot-toast',
              description: 'Lightweight toast notifications with promise support',
              url: 'https://react-hot-toast.com',
            },
            {
              name: 'react-icons / lucide-react',
              description: 'Icon libraries — pick one and stick with it across the project',
            },
            {
              name: 'date-fns',
              description: 'Modern date utility library — tree-shakable, immutable',
              url: 'https://date-fns.org',
            },
            {
              name: 'recharts',
              description: 'Composable chart library built on D3 for dashboards and data visualization',
              url: 'https://recharts.org',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Backend / BaaS',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@supabase/supabase-js',
              description: 'Open-source Firebase alternative — auth, database, storage, realtime',
              url: 'https://supabase.com',
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
              name: '@tanstack/react-query-devtools',
              description: 'Visual devtools for inspecting React Query cache and queries',
            },
            {
              name: 'eslint + prettier',
              description: 'Linting and formatting — use eslint-config-react-app or Airbnb config',
            },
          ],
        },
      ],
    },

    // ─── Section 3: Component Patterns ────────────────────────────────
    {
      id: 'component-patterns',
      title: 'Component Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'React components should be small, focused, and composable. Prefer composition over prop drilling, and use the children pattern for flexible layouts.',
        },
        {
          type: 'heading',
          content: 'Component Composition with Children',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/FormRow.jsx',
          code: `function FormRow({ label, error, children }) {
  return (
    <div className="form-row">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Usage
<FormRow label="Cabin name" error={errors?.name?.message}>
  <Input type="text" id="name" {...register("name")} />
</FormRow>`,
        },
        {
          type: 'heading',
          content: 'Props Destructuring with Defaults',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Form handles both create and edit
}`,
        },
        {
          type: 'heading',
          content: 'Conditional Rendering Patterns',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Early return for loading/error states
function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
      </Table.Header>
      <Table.Body data={cabins} render={(cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      )} />
    </Table>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Export Patterns',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Default export for page/route components
export default function Dashboard() { ... }

// Named exports for reusable components and hooks
export function Button({ children, variant }) { ... }
export function useCabins() { ... }

// Context: export provider + custom hook together
export { CitiesProvider, useCities };`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Keep components under 100 lines. If a component grows too large, extract subcomponents or custom hooks. A component should do one thing well.',
        },
      ],
    },

    // ─── Section 4: State Management ──────────────────────────────────
    {
      id: 'state-management',
      title: 'State Management',
      blocks: [
        {
          type: 'text',
          content:
            'Choosing the right state management approach depends on the type and scope of state. React provides built-in tools for most cases — reach for external libraries only when needed.',
        },
        {
          type: 'heading',
          content: 'When to Use What',
        },
        {
          type: 'list',
          items: [
            'useState — Simple local state (form inputs, toggles, counters)',
            'useReducer — Complex local state with multiple related values and actions',
            'Context API + useReducer — App-wide state shared across many components (auth, theme)',
            'Redux Toolkit — Large apps with complex global state and frequent updates',
            'React Query — Server state (API data that needs caching, refetching, syncing)',
          ],
        },
        {
          type: 'heading',
          content: 'useState — Simple State',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `const [isOpen, setIsOpen] = useState(false);
const [query, setQuery] = useState("");

// Lazy initializer (runs only on first render)
const [value, setValue] = useState(() => {
  const stored = localStorage.getItem("key");
  return stored ? JSON.parse(stored) : initialValue;
});`,
        },
        {
          type: 'heading',
          content: 'useReducer — Complex State Logic',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'useReducer pattern',
          code: `const initialState = {
  questions: [],
  status: "loading", // loading | ready | active | finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.points, state.highscore),
      };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

// In component:
const [{ questions, status, index, answer, points }, dispatch] =
  useReducer(reducer, initialState);

dispatch({ type: "newAnswer", payload: selectedIndex });`,
        },
        {
          type: 'heading',
          content: 'Context API + useReducer',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'contexts/CitiesContext.jsx',
          code: `import { createContext, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] =
    useReducer(reducer, initialState);

  // Wrap async functions with useCallback to prevent re-renders
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(\`\${BASE_URL}/cities/\${id}\`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error loading city..." });
      }
    },
    [currentCity.id]
  );

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, error, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook with safety check
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Always throw an error in your custom Context hook if used outside its Provider. This catches bugs early instead of producing confusing undefined errors.',
        },
      ],
    },

    // ─── Section 5: Custom Hooks ──────────────────────────────────────
    {
      id: 'custom-hooks',
      title: 'Custom Hooks',
      blocks: [
        {
          type: 'text',
          content:
            'Custom hooks extract reusable stateful logic from components. They follow a simple rule: start with "use" and can call other hooks inside.',
        },
        {
          type: 'heading',
          content: 'Data Fetching with AbortController',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useMovies.js',
          code: `import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(\`\${API_URL}?s=\${query}\`, {
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Not found");

          setMovies(data.Search);
        } catch (err) {
          // Ignore abort errors — they're expected on cleanup
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, error };
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always use AbortController in fetch hooks. Without it, fast user input (like typing in a search) causes race conditions where old responses overwrite newer ones.',
        },
        {
          type: 'heading',
          content: 'Persistent State (localStorage)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useLocalStorageState.js',
          code: `import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

// Usage:
const [watched, setWatched] = useLocalStorageState([], "watched");`,
        },
        {
          type: 'heading',
          content: 'Click Outside Detection',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useOutsideClick.js',
          code: `import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

// Usage:
const ref = useOutsideClick(() => setIsOpen(false));
return <div ref={ref}>...</div>;`,
        },
        {
          type: 'heading',
          content: 'Geolocation Hook',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useGeolocation.js',
          code: `import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}`,
        },
        {
          type: 'heading',
          content: 'URL Query Param Hook',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'hooks/useUrlPosition.js',
          code: `import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'A good custom hook is like a utility function but for stateful logic. If you find yourself copying useState + useEffect patterns between components, extract a hook.',
        },
      ],
    },

    // ─── Section 6: Routing ───────────────────────────────────────────
    {
      id: 'routing',
      title: 'Routing',
      blocks: [
        {
          type: 'text',
          content:
            'React Router v6 supports two styles: declarative with BrowserRouter + Routes (simpler) and data-driven with createBrowserRouter (loaders, actions). Pick based on your app\'s data needs.',
        },
        {
          type: 'heading',
          content: 'Declarative Routes (BrowserRouter)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx — simple routing',
          code: `import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<Booking />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Data Router (createBrowserRouter)',
        },
        {
          type: 'text',
          content:
            'The data router pattern supports loaders (fetch data before rendering) and actions (handle form submissions). Great for apps that need data fetching tied to routes.',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx — data router',
          code: `import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,       // Fetch data before render
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction, // Handle form submission
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}`,
        },
        {
          type: 'heading',
          content: 'Loaders and Actions',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/menu/Menu.jsx',
          code: `import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((item) => (
        <MenuItem key={item.id} pizza={item} />
      ))}
    </ul>
  );
}

// Loader function — co-located with the component
export async function loader() {
  const menu = await getMenu();
  return menu;
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/order/CreateOrder.jsx — action',
          code: `import { Form, redirect, useActionData } from "react-router-dom";

function CreateOrder() {
  const formErrors = useActionData();

  return (
    <Form method="POST">
      <input name="phone" required />
      {formErrors?.phone && <p className="error">{formErrors.phone}</p>}
      <button type="submit">Order</button>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Validate
  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone = "Please provide a valid phone number";
  if (Object.keys(errors).length > 0) return errors;

  // Submit and redirect
  const newOrder = await createOrder(data);
  return redirect(\`/order/\${newOrder.id}\`);
}`,
        },
        {
          type: 'heading',
          content: 'Protected Routes',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/ProtectedRoute.jsx',
          code: `import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  if (isAuthenticated) return children;
}

// Usage:
<Route
  path="app"
  element={
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  }
/>`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Co-locate loaders and actions with their route components (export from the same file). This keeps data requirements visible alongside the UI that uses them.',
        },
      ],
    },

    // ─── Section 7: Data Fetching with React Query ────────────────────
    {
      id: 'data-fetching',
      title: 'Data Fetching with React Query',
      blocks: [
        {
          type: 'text',
          content:
            'React Query manages server state — data that lives on a remote server and needs caching, background refetching, and optimistic updates. Separate your API calls into service modules.',
        },
        {
          type: 'heading',
          content: 'Setup',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx — QueryClient setup',
          code: `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // How long data stays "fresh" (0 = always refetch)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Service Module (API Layer)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'services/apiCabins.js',
          code: `import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  // Handle both create and edit
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin }]);
  if (id) query = query.update({ ...newCabin }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cabin could not be saved");
  return data;
}`,
        },
        {
          type: 'heading',
          content: 'Query Hook (Read Data)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/cabins/useCabins.js',
          code: `import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],    // Cache key — must be unique
    queryFn: getCabins,      // Function that returns a promise
  });

  return { isLoading, error, cabins };
}`,
        },
        {
          type: 'heading',
          content: 'Mutation Hook (Create / Update / Delete)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/cabins/useDeleteCabin.js',
          code: `import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // Invalidate cache → triggers refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

// Usage in component:
const { isDeleting, deleteCabin } = useDeleteCabin();
<button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
  Delete
</button>`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'The pattern is always the same: one service function (API call), one custom hook (useQuery/useMutation wrapper), used in the component. This keeps concerns separated and hooks reusable.',
        },
        {
          type: 'heading',
          content: 'React Query vs useEffect Fetch',
        },
        {
          type: 'list',
          items: [
            'React Query: Automatic caching, background refetching, loading/error states, devtools, retry logic',
            'useEffect fetch: Manual everything — you handle loading, errors, caching, and cleanup yourself',
            'Rule of thumb: Use React Query for any data from an API. Use useEffect for non-data side effects (event listeners, timers).',
          ],
        },
      ],
    },

    // ─── Section 8: Forms & Validation ────────────────────────────────
    {
      id: 'forms',
      title: 'Forms & Validation',
      blocks: [
        {
          type: 'text',
          content:
            'React Hook Form handles form state, validation, and submission with minimal re-renders. For simple forms, controlled components with useState work fine.',
        },
        {
          type: 'heading',
          content: 'React Hook Form Pattern',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/cabins/CreateCabinForm.jsx',
          code: `import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editCabin({ newCabinData: data, id: editId }, {
        onSuccess: () => { reset(); onCloseModal?.(); },
      });
    } else {
      createCabin(data, {
        onSuccess: () => { reset(); onCloseModal?.(); },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <Button disabled={isWorking}>
        {isEditSession ? "Edit cabin" : "Create cabin"}
      </Button>
    </Form>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Validation Rules',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Built-in rules
{...register("name", { required: "Name is required" })}
{...register("email", { pattern: { value: /\\S+@\\S+/, message: "Invalid email" } })}
{...register("age", { min: { value: 18, message: "Must be 18+" } })}
{...register("bio", { maxLength: { value: 200, message: "Max 200 chars" } })}

// Custom validation
{...register("discount", {
  validate: (value) =>
    value <= getValues().regularPrice || "Discount must be less than price",
})}

// Multiple custom validators
{...register("password", {
  validate: {
    minLength: (v) => v.length >= 8 || "Min 8 characters",
    hasNumber: (v) => /\\d/.test(v) || "Must contain a number",
  },
})}`,
        },
        {
          type: 'heading',
          content: 'Router Form Actions (Alternative)',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { Form, useActionData } from "react-router-dom";

function CreateOrder() {
  const formErrors = useActionData(); // Errors from action

  return (
    <Form method="POST">
      <input name="customer" required />
      <input name="phone" required />
      {formErrors?.phone && <p>{formErrors.phone}</p>}
      <button type="submit">Order</button>
    </Form>
  );
}

// Action validates and submits
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone))
    errors.phone = "Invalid phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(data);
  return redirect(\`/order/\${newOrder.id}\`);
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Use React Hook Form for complex forms with many fields and validation rules. For simple 1-2 field forms, controlled components with useState are fine — no need to add a library.',
        },
      ],
    },

    // ─── Section 9: Redux Toolkit ─────────────────────────────────────
    {
      id: 'redux',
      title: 'Redux Toolkit',
      blocks: [
        {
          type: 'text',
          content:
            'Redux Toolkit is the official way to write Redux. Use it for complex global client state that many components need. For server state (API data), prefer React Query instead.',
        },
        {
          type: 'heading',
          content: 'Store Setup',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'store.js',
          code: `import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;`,
        },
        {
          type: 'heading',
          content: 'Creating a Slice',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/cart/cartSlice.js',
          code: `import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // RTK uses Immer — mutative syntax is OK here
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((i) => i.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((i) => i.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // Remove item if quantity reaches 0
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors — co-locate with the slice
export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;`,
        },
        {
          type: 'heading',
          content: 'Async Thunks',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'features/user/userSlice.js',
          code: `import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = \`\${addressObj.locality}, \${addressObj.countryName}\`;

    // This becomes the payload
    return { position, address };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { username: "", status: "idle", position: {}, address: "" },
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
      }),
});`,
        },
        {
          type: 'heading',
          content: 'Using in Components',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { useSelector, useDispatch } from "react-redux";
import { addItem, getCurrentQuantityById } from "./cartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizza.id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return <button onClick={handleAddToCart}>Add to cart</button>;
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Co-locate selectors with the slice that owns the state. This way, if the state shape changes, you only update one file. Components never access state.cart.cart directly — they use selectors.',
        },
      ],
    },

    // ─── Section 10: Performance Optimization ─────────────────────────
    {
      id: 'performance',
      title: 'Performance Optimization',
      blocks: [
        {
          type: 'text',
          content:
            'React is fast by default. Only optimize when you measure a real problem. Premature optimization adds complexity without benefit.',
        },
        {
          type: 'heading',
          content: 'Code Splitting with React.lazy',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx — lazy-loaded routes',
          code: `import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// Lazy-load page components (creates separate bundles)
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}`,
        },
        {
          type: 'heading',
          content: 'memo — Prevent Unnecessary Re-renders',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { memo } from "react";

// Only re-renders when props actually change
const CabinRow = memo(function CabinRow({ cabin }) {
  return <div>{cabin.name}</div>;
});

// When to use memo:
// - Component re-renders often with the same props
// - Component is "heavy" (renders a list, chart, map)
// - Parent re-renders frequently but child props don't change

// When NOT to use memo:
// - Component is lightweight and fast to render
// - Props change on every render anyway
// - You haven't measured a performance problem`,
        },
        {
          type: 'heading',
          content: 'useMemo & useCallback',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { useMemo, useCallback } from "react";

function Dashboard({ bookings }) {
  // useMemo: memoize expensive calculations
  const stats = useMemo(() => {
    return bookings.reduce((acc, booking) => {
      acc.totalSales += booking.totalPrice;
      acc.totalBookings++;
      return acc;
    }, { totalSales: 0, totalBookings: 0 });
  }, [bookings]);

  // useCallback: memoize functions (stabilize references)
  const handleSort = useCallback((field) => {
    setSortBy(field);
  }, []);

  // useCallback is essential in Context providers
  // to prevent all consumers from re-rendering
  const getCity = useCallback(async function (id) {
    if (Number(id) === currentCity.id) return;
    // ...fetch logic
  }, [currentCity.id]);
}`,
        },
        {
          type: 'heading',
          content: 'React Query Optimization',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data stays fresh for 60s (avoid refetch)
    },
  },
});

// Selective cache invalidation (only refetch what changed)
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["cabins"] });
  // Does NOT invalidate ["bookings"] or other queries
};`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Don\'t wrap everything in memo/useMemo/useCallback. The optimization itself has a cost. Profile first with React DevTools Profiler, then optimize the specific bottleneck.',
        },
      ],
    },

    // ─── Section 11: Compound Components ──────────────────────────────
    {
      id: 'compound-components',
      title: 'Compound Components',
      blocks: [
        {
          type: 'text',
          content:
            'Compound components share state implicitly via Context. They let consumers compose flexible UIs without prop drilling — like how <select> and <option> work together in HTML.',
        },
        {
          type: 'heading',
          content: 'Modal as Compound Component',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/Modal.jsx',
          code: `import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(windowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="overlay">
      <div className="modal" ref={ref}>
        <button onClick={close}>&times;</button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;

// Usage — clean, declarative API:
<Modal>
  <Modal.Open opens="cabin-form">
    <Button>Add new cabin</Button>
  </Modal.Open>
  <Modal.Window name="cabin-form">
    <CreateCabinForm />
  </Modal.Window>
</Modal>`,
        },
        {
          type: 'heading',
          content: 'Table as Compound Component with Render Props',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/Table.jsx',
          code: `import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div role="table">{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className="table-header"
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div role="row" style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data.length) return <p>No data to show</p>;
  return <section>{data.map(render)}</section>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
export default Table;

// Usage with render prop:
<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
  <Table.Header>
    <div>Cabin</div>
    <div>Capacity</div>
    <div>Price</div>
  </Table.Header>
  <Table.Body
    data={cabins}
    render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
  />
</Table>`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use compound components for any UI that has an "open/close" state shared between a trigger and content: Modals, Dropdowns, Menus, Accordions, Tabs.',
        },
        {
          type: 'heading',
          content: 'When to Use Compound Components',
        },
        {
          type: 'list',
          items: [
            'Modal + trigger button share open/close state',
            'Dropdown menu + toggle button share open state and position',
            'Table header + body share column layout',
            'Tabs + tab panels share active tab state',
            'The pattern replaces prop drilling with implicit Context-based communication',
          ],
        },
      ],
    },

    // ─── Section 12: Styling Approaches ───────────────────────────────
    {
      id: 'styling',
      title: 'Styling Approaches',
      blocks: [
        {
          type: 'text',
          content:
            'React supports multiple styling strategies. Choose one and use it consistently across the project. Each has trade-offs in DX, performance, and flexibility.',
        },
        {
          type: 'heading',
          content: 'Styled Components',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/Button.jsx — styled-components',
          code: `import styled, { css } from "styled-components";

const sizes = {
  small: css\`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
  \`,
  medium: css\`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  \`,
  large: css\`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  \`,
};

const variations = {
  primary: css\`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    &:hover { background-color: var(--color-brand-700); }
  \`,
  secondary: css\`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    &:hover { background-color: var(--color-grey-50); }
  \`,
  danger: css\`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    &:hover { background-color: var(--color-red-800); }
  \`,
};

const Button = styled.button\`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  \${(props) => sizes[props.size]}
  \${(props) => variations[props.variation]}
\`;

Button.defaultProps = { variation: "primary", size: "medium" };
export default Button;`,
        },
        {
          type: 'heading',
          content: 'Global Styles with Styled Components',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'styles/GlobalStyles.js',
          code: `import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle\`
  :root {
    --color-brand-50: #eef2ff;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-grey-0: #fff;
    --color-grey-700: #374151;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Poppins", sans-serif;
    color: var(--color-grey-700);
    line-height: 1.5;
  }

  button { cursor: pointer; }
  *:disabled { cursor: not-allowed; }

  input:focus,
  button:focus,
  textarea:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
\`;

export default GlobalStyles;

// Usage in App.jsx:
<>
  <GlobalStyles />
  <BrowserRouter>...</BrowserRouter>
</>`,
        },
        {
          type: 'heading',
          content: 'Tailwind CSS',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Tailwind example component',
          code: `function CreateOrder() {
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="grow rounded-full border border-stone-200 px-4 py-2
                       text-sm transition-all focus:outline-none
                       focus:ring focus:ring-yellow-400"
            type="text"
            name="customer"
            required
          />
        </div>
      </Form>
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Choosing a Styling Approach',
        },
        {
          type: 'list',
          items: [
            'Tailwind CSS — Fast prototyping, no context switching, great for utility-heavy UIs',
            'Styled Components — Dynamic styles from props, scoped by default, great for design systems',
            'CSS Modules — Zero runtime cost, scoped class names, works with any CSS knowledge',
            'Pick one per project and be consistent. Mixing approaches leads to confusion.',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Styled-components and CSS-in-JS have a runtime cost. For performance-critical apps, consider Tailwind or CSS Modules which have zero runtime overhead.',
        },
      ],
    },

    // ─── Section 13: Error Handling & Boundaries ──────────────────────
    {
      id: 'error-handling',
      title: 'Error Handling & Boundaries',
      blocks: [
        {
          type: 'text',
          content:
            'Handle errors at multiple levels: component-level try/catch for async operations, Error Boundaries for render errors, and React Query/Router for data errors.',
        },
        {
          type: 'heading',
          content: 'Error Boundary with react-error-boundary',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx — top-level error boundary',
          code: `import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>...</Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'ui/ErrorFallback.jsx',
          code: `function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="flex h-screen items-center justify-center p-12">
      <div className="max-w-xl rounded border bg-white p-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mb-8 text-gray-500">{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </main>
  );
}`,
        },
        {
          type: 'heading',
          content: 'React Query Error Handling',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Mutations: handle errors with toast
const { mutate, isLoading } = useMutation({
  mutationFn: deleteCabin,
  onSuccess: () => {
    toast.success("Deleted successfully");
    queryClient.invalidateQueries({ queryKey: ["cabins"] });
  },
  onError: (err) => toast.error(err.message),
});

// Queries: errors available in hook return
const { isLoading, error, data } = useQuery({
  queryKey: ["cabins"],
  queryFn: getCabins,
});

if (error) return <ErrorMessage message={error.message} />;`,
        },
        {
          type: 'heading',
          content: 'Async Error Handling in Effects',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `useEffect(() => {
  async function fetchData() {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, [url]);`,
        },
        {
          type: 'heading',
          content: 'Router Error Elements',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Route-level error handling with createBrowserRouter
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,  // Catches any error in child routes
    children: [
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,  // Catches loader errors specifically
      },
    ],
  },
]);

// Error component using useRouteError
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Layer your error handling: Error Boundaries catch render errors, React Query handles server errors with toast, and route errorElement handles loader/action failures.',
        },
      ],
    },

    // ─── Section 14: Context API Patterns ─────────────────────────────
    {
      id: 'context-api',
      title: 'Context API Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Context provides a way to pass data through the component tree without prop drilling. Use it for global state like auth, theme, and locale. For complex state logic, combine Context with useReducer.',
        },
        {
          type: 'heading',
          content: 'Creating a Context Provider',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'contexts/AuthContext.jsx',
          code: `import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };`,
        },
        {
          type: 'heading',
          content: 'Using the Context',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `// Wrap your app
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

// Consume anywhere in the tree
function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Context with useReducer (Complex State)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'contexts/CartContext.jsx',
          code: `import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = { items: [], totalPrice: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case 'cart/addItem': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items,
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }
    case 'cart/removeItem':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
        totalPrice: state.items
          .filter((i) => i.id !== action.payload)
          .reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    case 'cart/clear':
      return initialState;
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function CartProvider({ children }) {
  const [{ items, totalPrice }, dispatch] = useReducer(cartReducer, initialState);

  function addItem(item) {
    dispatch({ type: 'cart/addItem', payload: item });
  }

  function removeItem(id) {
    dispatch({ type: 'cart/removeItem', payload: id });
  }

  function clearCart() {
    dispatch({ type: 'cart/clear' });
  }

  return (
    <CartContext.Provider value={{ items, totalPrice, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error('useCart must be used within a CartProvider');
  return context;
}

export { CartProvider, useCart };`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Context causes all consumers to re-render when the value changes. For frequently changing values (like mouse position), use a state management library instead. Context is ideal for infrequent updates like auth, theme, and locale.',
        },
      ],
    },

    // ─── Section 15: useReducer ───────────────────────────────────────
    {
      id: 'use-reducer',
      title: 'useReducer',
      blocks: [
        {
          type: 'text',
          content:
            'useReducer is an alternative to useState for complex state logic — multiple related state values, state transitions that depend on the previous state, or when the next state depends on an action type.',
        },
        {
          type: 'heading',
          content: 'When to Use useReducer vs useState',
        },
        {
          type: 'list',
          items: [
            'useState: 1-2 independent state values, simple updates (toggle, set value)',
            'useReducer: 3+ related state values, complex transitions, state machine patterns',
            'Rule of thumb: if you have multiple setState calls in one handler, consider useReducer',
          ],
        },
        {
          type: 'heading',
          content: 'Basic Pattern',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { useReducer } from 'react';

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        type="range" min="1" max="10"
        value={state.step}
        onChange={(e) => dispatch({ type: 'setStep', payload: +e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Real-World Example: Form State',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `const initialState = {
  status: 'idle', // idle | loading | error | success
  data: null,
  error: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: '' };
    case 'success':
      return { status: 'success', data: action.payload, error: '' };
    case 'error':
      return { ...state, status: 'error', error: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function SubmitForm() {
  const [{ status, data, error }, dispatch] = useReducer(formReducer, initialState);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'loading' });
    try {
      const result = await submitData(new FormData(e.target));
      dispatch({ type: 'success', payload: result });
    } catch (err) {
      dispatch({ type: 'error', payload: err.message });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {status === 'success' && <p className="text-green-500">Submitted!</p>}
      <button disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Name your action types with a domain prefix (e.g., "cart/addItem", "form/setField") to keep them organized and avoid collisions when combining with Context.',
        },
      ],
    },

    // ─── Section 16: Lazy Loading & Code Splitting ────────────────────
    {
      id: 'lazy-loading',
      title: 'Lazy Loading & Code Splitting',
      blocks: [
        {
          type: 'text',
          content:
            'Code splitting breaks your app into smaller chunks loaded on demand. React.lazy + Suspense let you lazily load components, reducing the initial bundle size. Vite handles the bundling automatically.',
        },
        {
          type: 'heading',
          content: 'Route-Based Code Splitting',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'App.jsx',
          code: `import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpinnerFullPage from './ui/SpinnerFullPage';

// Lazy load route components — each becomes a separate chunk
const HomePage = lazy(() => import('./pages/HomePage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Component-Level Lazy Loading',
        },
        {
          type: 'code',
          language: 'jsx',
          code: `import { lazy, Suspense } from 'react';

// Heavy component loaded only when needed
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Analytics</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Vite Chunk Naming',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'vite.config.js',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libs in separate chunk (cached independently)
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});`,
        },
        {
          type: 'heading',
          content: 'Analyzing Bundle Size',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Install the visualizer
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
# import { visualizer } from 'rollup-plugin-visualizer';
# plugins: [react(), visualizer({ open: true })]

# Build and open the visualization
npm run build`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Only lazy-load routes and heavy components (charts, editors, maps). Don\'t lazy-load small UI components — the loading flicker is worse than the bundle cost.',
        },
      ],
    },

    // ─── Section 17: Deployment ───────────────────────────────────────
    {
      id: 'deployment',
      title: 'Deployment',
      blocks: [
        {
          type: 'text',
          content:
            'React apps built with Vite output static files (HTML/CSS/JS) that can be deployed to any static hosting service. The key challenge is handling client-side routing — the server must return index.html for all routes.',
        },
        {
          type: 'heading',
          content: 'Vercel',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'vercel.json',
          code: `{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}`,
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Deploy with Vercel CLI
npm i -g vercel
vercel              # Preview deployment
vercel --prod       # Production deployment

# Or connect GitHub repo in Vercel dashboard for auto-deploy`,
        },
        {
          type: 'heading',
          content: 'Netlify',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'public/_redirects',
          code: `/* /index.html 200`,
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Deploy with Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Or connect GitHub repo in Netlify dashboard`,
        },
        {
          type: 'heading',
          content: 'GitHub Pages',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'vite.config.js',
          code: `export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Required for GitHub Pages
});`,
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json — deploy script',
          code: `{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}`,
        },
        {
          type: 'heading',
          content: 'Environment Variables in Production',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env.production',
          code: `VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_APP_NAME=MyApp`,
        },
        {
          type: 'list',
          items: [
            'Vite only exposes variables prefixed with VITE_ to the browser',
            'Set env vars in hosting dashboard (Vercel/Netlify) for secrets',
            '.env.production is used during build, .env.development during dev',
            'Access with import.meta.env.VITE_API_URL',
          ],
        },
        {
          type: 'heading',
          content: 'Build Optimization Checklist',
        },
        {
          type: 'list',
          items: [
            'Run npm run build and check output size',
            'Lazy-load routes to reduce initial bundle',
            'Use manualChunks for large vendor libraries',
            'Compress images and use WebP format',
            'Enable Gzip/Brotli compression on your hosting (usually automatic)',
            'Set Cache-Control headers for static assets (Vite adds hashes to filenames)',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'GitHub Pages doesn\'t support client-side routing natively. Use HashRouter instead of BrowserRouter, or add a 404.html redirect hack. Vercel and Netlify handle SPA routing properly.',
        },
      ],
    },
  ],
}

export default reactData
