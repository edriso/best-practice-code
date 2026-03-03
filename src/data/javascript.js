const javascriptData = {
  id: 'javascript',
  name: 'JavaScript & OOP',
  description: 'Core JavaScript patterns, OOP with classes and prototypes, async programming, and modern ES6+ features',
  sections: [
    // ─── Section 1: OOP with ES6 Classes ──────────────────────────────
    {
      id: 'oop-classes',
      title: 'OOP with ES6 Classes',
      blocks: [
        {
          type: 'text',
          content:
            'ES6 classes are the modern way to do OOP in JavaScript. They use prototypal inheritance under the hood but provide a cleaner syntax.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Class declaration',
          code: `class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance method (on prototype)
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  // Getter
  get age() {
    return this.calcAge();
  }

  // Setter with validation
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else throw new Error(\`\${name} is not a full name\`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method (on the class itself, not instances)
  static hey() {
    console.log('Hey there!');
  }
}

const jonas = new Person('Jonas Schmedtmann', 1991);
console.log(jonas.age); // Getter
Person.hey(); // Static method`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Classes are NOT hoisted (unlike function declarations). They are always in strict mode. The constructor runs automatically when you use "new".',
        },
      ],
    },

    // ─── Section 2: Inheritance ───────────────────────────────────────
    {
      id: 'inheritance',
      title: 'Inheritance & Extends',
      blocks: [
        {
          type: 'text',
          content:
            'Use extends and super() for class inheritance. The child class inherits all methods and can override or add new ones.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Class inheritance',
          code: `class Student extends Person {
  university;
  #studyHours = 0; // Private field
  #course;

  constructor(fullName, birthYear, course) {
    // super() MUST be called first in constructor
    super(fullName, birthYear);
    this.#course = course;
  }

  // New method
  study(hours) {
    this.#studyHours += hours;
  }

  // Override parent method
  calcAge() {
    console.log(\`I'm \${super.calcAge()} years old student\`);
  }

  // Getter for private field
  get studyHours() {
    return this.#studyHours;
  }
}

const mike = new Student('Mike Johnson', 2000, 'CS');
mike.study(3);
mike.calcAge(); // Uses overridden version`,
        },
        {
          type: 'heading',
          content: 'Encapsulation',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `class BankAccount {
  // Public field
  locale = navigator.language;

  // Private fields (truly private, not accessible outside)
  #movements = [];
  #pin;

  constructor(owner, pin) {
    this.owner = owner;
    this.#pin = pin;
  }

  // Public interface (API)
  deposit(val) {
    this.#movements.push(val);
    return this; // Enable chaining
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  getBalance() {
    return this.#movements.reduce((acc, mov) => acc + mov, 0);
  }

  // Private method
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      return this;
    }
  }
}

// Method chaining
const account = new BankAccount('Jonas', 1111);
account.deposit(300).withdraw(100).requestLoan(1000);`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use # for truly private fields. Return "this" from methods to enable chaining. Keep the public API small — only expose what consumers need.',
        },
      ],
    },

    // ─── Section 3: Closures & Higher-Order Functions ─────────────────
    {
      id: 'closures',
      title: 'Closures & Higher-Order Functions',
      blocks: [
        {
          type: 'text',
          content:
            'A closure gives a function access to variables from its parent scope, even after the parent has returned. Higher-order functions take or return functions.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Closure example',
          code: `// The returned function "closes over" the passengerCount variable
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(\`\${passengerCount} passengers\`);
  };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers — still has access to passengerCount`,
        },
        {
          type: 'heading',
          content: 'Higher-Order Functions',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Function that returns a function
const greet = function (greeting) {
  return function (name) {
    console.log(\`\${greeting} \${name}\`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas'); // Hey Jonas

// Same with arrow functions
const greetArrow = (greeting) => (name) => \`\${greeting} \${name}\`;

// Practical: function factory
const withTax = (rate) => (price) => price * (1 + rate);
const withVAT = withTax(0.23);
console.log(withVAT(100)); // 123`,
        },
        {
          type: 'heading',
          content: 'call, apply, bind',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const lufthansa = {
  airline: 'Lufthansa',
  bookings: [],
  book(flightNum, name) {
    this.bookings.push({ flight: \`\${this.airline}\${flightNum}\`, name });
  },
};

const eurowings = { airline: 'Eurowings', bookings: [] };

// call — invoke with specific "this"
lufthansa.book.call(eurowings, 23, 'Sarah'); // this = eurowings

// bind — returns new function with "this" preset
const bookEW = lufthansa.book.bind(eurowings);
bookEW(23, 'Steven');

// Partial application with bind
const bookEW23 = lufthansa.book.bind(eurowings, 23);
bookEW23('Jonas'); // flightNum is already set to 23`,
        },
      ],
    },

    // ─── Section 4: Arrays & Functional Programming ───────────────────
    {
      id: 'arrays',
      title: 'Arrays & Functional Programming',
      blocks: [
        {
          type: 'text',
          content:
            'Modern JavaScript heavily uses array methods for data transformation. Chain map, filter, reduce for clean, readable data pipelines.',
        },
        {
          type: 'heading',
          content: 'Essential Array Methods',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const movements = [200, -400, 300, -100, 500, -150];

// map — transform each element
const eurToUsd = movements.map((mov) => mov * 1.1);

// filter — keep elements that match
const deposits = movements.filter((mov) => mov > 0);

// reduce — accumulate to single value
const balance = movements.reduce((acc, mov) => acc + mov, 0);

// find — first matching element
const firstWithdrawal = movements.find((mov) => mov < 0);

// findIndex — index of first match
const index = movements.findIndex((mov) => mov === 300);

// some / every — boolean checks
const hasDeposit = movements.some((mov) => mov > 0);
const allPositive = movements.every((mov) => mov > 0);

// flat / flatMap — flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]];
nested.flat(); // [1, 2, 3, 4, 5, 6]

// flatMap = map + flat (one level)
const balances = accounts.flatMap((acc) => acc.movements);`,
        },
        {
          type: 'heading',
          content: 'Method Chaining (Pipeline)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Chain methods for data transformation pipelines
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * 1.1)
  .reduce((acc, mov) => acc + mov, 0);

// Real-world: format data for display
const displayMovements = movements
  .slice() // Don't mutate original
  .sort((a, b) => a - b)
  .map((mov, i) => \`Movement \${i + 1}: \${mov > 0 ? 'Deposit' : 'Withdrawal'} \${Math.abs(mov)}\`);`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use .slice() before .sort() to avoid mutating the original array. Chain filter → map → reduce for clean data pipelines. Avoid chaining too many operations — split into named variables for readability.',
        },
      ],
    },

    // ─── Section 5: Destructuring & Modern Syntax ─────────────────────
    {
      id: 'modern-syntax',
      title: 'Destructuring & Modern Syntax',
      blocks: [
        {
          type: 'text',
          content:
            'ES6+ introduced syntax features that make code more concise and expressive. Use them consistently.',
        },
        {
          type: 'heading',
          content: 'Destructuring',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Array destructuring
const [first, , third] = [1, 2, 3]; // Skip elements

// Swap variables
let [a, b] = [1, 2];
[a, b] = [b, a];

// Object destructuring with rename + defaults
const { name: restaurantName, menu = [], rating = 5 } = restaurant;

// Nested destructuring
const { openingHours: { thu: { open, close } } } = restaurant;

// Function parameter destructuring
function createOrder({ mainDish, sideDish = 'Salad', drink }) {
  return \`\${mainDish} with \${sideDish} and \${drink}\`;
}
createOrder({ mainDish: 'Pizza', drink: 'Water' });`,
        },
        {
          type: 'heading',
          content: 'Spread & Rest',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Spread: unpack elements
const newArr = [1, 2, ...oldArr]; // Arrays
const newObj = { ...oldObj, newProp: 'val' }; // Objects (shallow copy)

// Shallow copy
const arrCopy = [...arr];
const objCopy = { ...obj };

// Merge
const merged = [...arr1, ...arr2];
const mergedObj = { ...defaults, ...userConfig };

// Rest: collect remaining elements
const [first, second, ...others] = [1, 2, 3, 4, 5];
const { name, ...otherProps } = bigObject;

// Rest in function parameters
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}`,
        },
        {
          type: 'heading',
          content: 'Optional Chaining & Nullish Coalescing',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Optional chaining — returns undefined instead of error
const openHour = restaurant.openingHours?.mon?.open;
const result = user?.address?.city; // Safe nested access

// Works with methods and arrays
user.getOrders?.();
users?.[0]?.name;

// Nullish coalescing — only null/undefined (not 0 or "")
const guests = restaurant.numGuests ?? 10;

// Logical assignment operators
user.name ??= 'Anonymous'; // Set only if null/undefined
user.active ||= true;      // Set only if falsy
user.count &&= 2;          // Set only if truthy`,
        },
      ],
    },

    // ─── Section 6: Data Structures ───────────────────────────────────
    {
      id: 'data-structures',
      title: 'Maps, Sets & Data Structures',
      blocks: [
        {
          type: 'text',
          content:
            'Maps and Sets were added in ES6. Maps are better than objects for key-value data when keys aren\'t strings. Sets are perfect for unique values.',
        },
        {
          type: 'heading',
          content: 'Map',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Creating a map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze');
rest.set(true, 'We are open');

// Chaining sets
rest.set('open', 11).set('close', 23);

// Reading
rest.get('name'); // 'Classico Italiano'
rest.has('name'); // true
rest.size;        // 6

// From array of entries
const question = new Map([
  ['question', 'What is the best language?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
]);

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));

// Iterate
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(\`Option \${key}: \${value}\`);
}`,
        },
        {
          type: 'heading',
          content: 'Set',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const staff = ['Waiter', 'Chef', 'Manager', 'Waiter', 'Chef'];

// Unique values
const uniqueStaff = [...new Set(staff)]; // ['Waiter', 'Chef', 'Manager']

// Count unique values
new Set(staff).size; // 3

// Check membership
const orderSet = new Set(['Pasta', 'Pizza']);
orderSet.has('Pizza'); // true

// Use case: remove duplicates from arrays
const uniqueLetters = [...new Set('javascript')]; // unique characters`,
        },
        {
          type: 'heading',
          content: 'When to Use What',
        },
        {
          type: 'list',
          items: [
            'Arrays — ordered lists, may contain duplicates, when you need index access',
            'Sets — unique values, high-performance membership checks (.has)',
            'Objects — traditional key-value with string keys, when you need methods, JSON data',
            'Maps — any key type, better performance for frequent additions/removals, maintain insertion order',
          ],
        },
      ],
    },

    // ─── Section 7: Async JavaScript ──────────────────────────────────
    {
      id: 'async',
      title: 'Async / Await & Promises',
      blocks: [
        {
          type: 'text',
          content:
            'Async/await is syntactic sugar over Promises. Use it for sequential async operations, and Promise.all/allSettled for parallel ones.',
        },
        {
          type: 'heading',
          content: 'async/await',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const getCountryData = async function (country) {
  try {
    // Sequential requests
    const res = await fetch(\`https://restcountries.com/v3.1/name/\${country}\`);
    if (!res.ok) throw new Error(\`Country not found (\${res.status})\`);
    const [data] = await res.json();

    const neighbour = data.borders?.[0];
    if (!neighbour) throw new Error('No neighbour found');

    const res2 = await fetch(
      \`https://restcountries.com/v3.1/alpha/\${neighbour}\`
    );
    const [data2] = await res2.json();

    return [data, data2];
  } catch (err) {
    console.error(\`Error: \${err.message}\`);
    throw err; // Re-throw so caller can handle it
  }
};`,
        },
        {
          type: 'heading',
          content: 'Parallel Execution',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Promise.all — fails fast if ANY promise rejects
const getAll = async function (c1, c2, c3) {
  const data = await Promise.all([
    fetch(\`\${API}/name/\${c1}\`).then((r) => r.json()),
    fetch(\`\${API}/name/\${c2}\`).then((r) => r.json()),
    fetch(\`\${API}/name/\${c3}\`).then((r) => r.json()),
  ]);
  return data.map((d) => d[0].capital);
};

// Promise.allSettled — returns all results (fulfilled or rejected)
const results = await Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]);
// [{status: 'fulfilled', value: ...}, {status: 'rejected', reason: ...}, ...]

// Promise.race — first to settle wins
const fastest = await Promise.race([
  fetch(url1),
  fetch(url2),
]);

// Promise.any — first to FULFILL wins (ignores rejections)
const firstSuccess = await Promise.any([promise1, promise2, promise3]);`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Use Promise.all when requests are independent — it runs them in parallel. Don\'t await them sequentially if they don\'t depend on each other, or you waste time waiting.',
        },
      ],
    },

    // ─── Section 8: Modules ───────────────────────────────────────────
    {
      id: 'modules',
      title: 'ES6 Modules',
      blocks: [
        {
          type: 'text',
          content:
            'ES6 modules use import/export syntax. Each file is a module with its own scope. Modules are strict mode by default and support tree shaking.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Named exports & imports',
          code: `// shoppingCart.js — named exports
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
};

const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity as qty };

// main.js — named imports
import { addToCart, totalPrice as price, qty } from './shoppingCart.js';
import * as ShoppingCart from './shoppingCart.js'; // Namespace import`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Default exports',
          code: `// One default export per module (for the main thing)
export default function (product, quantity) {
  cart.push({ product, quantity });
}

// Import with any name
import add from './shoppingCart.js';`,
        },
        {
          type: 'heading',
          content: 'Module Pattern (Pre-ES6)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// IIFE module pattern — still used in some codebases
const ShoppingCart = (function () {
  const cart = [];
  const totalPrice = 237;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
  };

  return { addToCart, cart, totalPrice };
})();`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use named exports for utility modules with multiple exports. Use default exports for modules that export one main thing (a class, a component). Don\'t mix both in one module.',
        },
      ],
    },

    // ─── Section 9: MVC Architecture ──────────────────────────────────
    {
      id: 'mvc',
      title: 'MVC Architecture',
      blocks: [
        {
          type: 'text',
          content:
            'The Model-View-Controller pattern separates data (Model), presentation (View), and logic (Controller). The Forkify project demonstrates this with a publisher-subscriber pattern for event handling.',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'src',
            children: [
              { name: 'js', children: [
                { name: 'model.js', comment: 'State + business logic + API calls' },
                { name: 'controller.js', comment: 'Bridge between model and views' },
                { name: 'helpers.js', comment: 'Reusable utility functions' },
                { name: 'config.js', comment: 'Constants and configuration' },
                { name: 'views', children: [
                  { name: 'View.js', comment: 'Parent class for all views' },
                  { name: 'recipeView.js' },
                  { name: 'searchView.js' },
                  { name: 'resultsView.js' },
                  { name: 'bookmarksView.js' },
                  { name: 'paginationView.js' },
                ]},
              ]},
            ],
          },
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Publisher-Subscriber pattern',
          code: `// View (publisher) — doesn't know about the controller
class RecipeView extends View {
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

// Controller (subscriber) — connects model and view
const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Init — subscribe controller to view events
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The View doesn\'t import the Controller. Instead, the Controller passes its handler functions to the View during initialization. This keeps them decoupled.',
        },
      ],
    },

    // ─── Section 10: DOM Manipulation ─────────────────────────────────
    {
      id: 'dom',
      title: 'DOM Manipulation',
      blocks: [
        {
          type: 'text',
          content:
            'Efficient DOM manipulation means selecting elements once, using event delegation, and preferring IntersectionObserver over scroll events.',
        },
        {
          type: 'heading',
          content: 'Event Delegation',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Bad: listener on every link
document.querySelectorAll('.nav__link').forEach((el) =>
  el.addEventListener('click', callback)
);

// Good: one listener on parent (event delegation)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});`,
        },
        {
          type: 'heading',
          content: 'IntersectionObserver',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Sticky navigation
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // viewport
  threshold: 0,
  rootMargin: \`-\${navHeight}px\`,
});

headerObserver.observe(header);

// Lazy loading images
const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  },
  { root: null, threshold: 0, rootMargin: '200px' }
);`,
        },
        {
          type: 'heading',
          content: 'Creating & Inserting Elements',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// Create
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies. <button class="btn">Got it!</button>';

// Insert
header.prepend(message);       // First child
header.append(message);        // Last child (moves it)
header.before(message);        // Sibling before
header.after(message);         // Sibling after

// Clone to insert in multiple places
header.append(message.cloneNode(true));

// Remove
message.remove();`,
        },
      ],
    },

    // ─── Section 11: Numbers, Dates & Intl ────────────────────────────
    {
      id: 'numbers-dates',
      title: 'Numbers, Dates & Internationalization',
      blocks: [
        {
          type: 'text',
          content:
            'Use the Intl API for locale-aware formatting. It handles currencies, dates, and numbers without external libraries.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Number formatting',
          code: `// Intl.NumberFormat
const num = 3884764.23;

new Intl.NumberFormat('en-US').format(num);           // 3,884,764.23
new Intl.NumberFormat('de-DE').format(num);           // 3.884.764,23
new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(num); // $3,884,764.23

new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'mile-per-hour',
}).format(50); // 50 mph`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Date formatting',
          code: `const now = new Date();

// Intl.DateTimeFormat
new Intl.DateTimeFormat('en-US').format(now); // 3/3/2026

new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
}).format(now); // Tuesday, March 3, 2026, 4:30 PM

// Relative time (e.g., "2 days ago")
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
rtf.format(-1, 'day');  // "yesterday"
rtf.format(-2, 'day');  // "2 days ago"
rtf.format(1, 'hour');  // "in 1 hour"`,
        },
        {
          type: 'heading',
          content: 'Timers',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `// setTimeout — runs once after delay
const timerId = setTimeout(
  (ing1, ing2) => console.log(\`Pizza with \${ing1} and \${ing2}\`),
  3000,
  'olives',
  'spinach'
);
clearTimeout(timerId); // Cancel before it runs

// setInterval — runs repeatedly
const clock = setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);
clearInterval(clock); // Stop`,
        },
      ],
    },

    // ─── Section 12: Error Handling ───────────────────────────────────
    {
      id: 'error-handling',
      title: 'Error Handling',
      blocks: [
        {
          type: 'text',
          content:
            'Always handle errors in async code. Use try/catch with async/await, and .catch() with raw promises.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Reusable fetch helper with timeout',
          code: `const TIMEOUT_SEC = 10;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(\`Request took too long! Timeout after \${s} seconds\`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(\`\${data.message} (\${res.status})\`);
    return data;
  } catch (err) {
    throw err; // Re-throw for caller to handle
  }
};`,
        },
        {
          type: 'heading',
          content: 'Custom Error Classes',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(\`\${resource} not found\`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Usage
try {
  if (!data) throw new NotFoundError('Recipe');
} catch (err) {
  if (err instanceof NotFoundError) {
    showNotFoundMessage();
  } else {
    showGenericError();
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always re-throw errors in helper functions so the caller can decide how to handle them. Only catch errors at the level where you can actually do something useful (show a message, retry, etc.).',
        },
      ],
    },
  ],
}

export default javascriptData
