const html = {
  id: 'html',
  name: 'HTML Semantic',
  description:
    'Semantic HTML elements, accessibility patterns, forms, meta tags, and structured markup best practices',
  sections: [
    {
      id: 'semantic-elements',
      title: 'Semantic Elements',
      blocks: [
        {
          type: 'text',
          content:
            'Semantic HTML uses elements that describe their meaning to both the browser and the developer. This improves accessibility, SEO, and code readability.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Page structure',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
</head>
<body>
  <header>
    <nav><!-- Main navigation --></nav>
  </header>

  <main>
    <section><!-- Thematic grouping of content --></section>
    <article><!-- Self-contained content --></article>
    <aside><!-- Sidebar / tangential content --></aside>
  </main>

  <footer>
    <nav><!-- Footer navigation --></nav>
  </footer>
</body>
</html>`,
        },
        {
          type: 'heading',
          content: 'When to Use Each Element',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            '<header> — Introductory content or navigational aids (page or section level)',
            '<nav> — Major navigation blocks (main nav, footer nav, breadcrumbs)',
            '<main> — The dominant content of the page (only one per page)',
            '<section> — Thematic grouping of content, typically with a heading',
            '<article> — Self-contained content that makes sense on its own (blog post, product card, comment)',
            '<aside> — Tangentially related content (sidebar, pull quotes, related links)',
            '<footer> — Footer for its nearest sectioning parent',
            '<figure> / <figcaption> — Self-contained content with optional caption (images, diagrams, code)',
            '<details> / <summary> — Disclosure widget for expandable content',
            '<time datetime="..."> — Machine-readable dates and times',
            '<mark> — Highlighted/referenced text',
            '<address> — Contact information for the nearest article or body',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Avoid div soup — don\'t use <div> when a semantic element exists. Use <div> only for styling/layout wrappers with no semantic meaning.',
        },
      ],
    },
    {
      id: 'heading-hierarchy',
      title: 'Heading Hierarchy',
      blocks: [
        {
          type: 'text',
          content:
            'Headings create a document outline that screen readers and search engines use to understand content structure. Always maintain a logical hierarchy.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Correct heading hierarchy',
          code: `<!-- Correct: logical, sequential heading order -->
<h1>Site Title</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Another Section</h2>
    <h3>Subsection</h3>
      <h4>Sub-subsection</h4>

<!-- Wrong: skipping heading levels -->
<h1>Title</h1>
  <h3>Jumped from h1 to h3!</h3>
  <h4>This is confusing for screen readers</h4>`,
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Only one <h1> per page — the primary topic',
            'Never skip heading levels (h1 → h3)',
            'Use headings for structure, not for styling (use CSS for visual size)',
            'Each <section> and <article> should ideally start with a heading',
          ],
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility (a11y)',
      blocks: [
        {
          type: 'text',
          content:
            'Accessible HTML ensures your content works for everyone — including users with screen readers, keyboard navigation, and other assistive technologies.',
        },
        {
          type: 'heading',
          content: 'ARIA Attributes',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'ARIA patterns',
          code: `<!-- aria-label: accessible name when visible text is insufficient -->
<button aria-label="Close menu">
  <svg><!-- X icon --></svg>
</button>

<!-- aria-labelledby: reference another element as the label -->
<section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing Plans</h2>
</section>

<!-- aria-describedby: additional description -->
<input
  type="email"
  aria-describedby="email-hint"
/>
<p id="email-hint">We'll never share your email</p>

<!-- aria-hidden: hide decorative elements from screen readers -->
<span aria-hidden="true">🎉</span>

<!-- aria-live: announce dynamic content changes -->
<div aria-live="polite" role="status">
  3 results found
</div>

<!-- aria-expanded: toggle state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>...</ul>`,
        },
        {
          type: 'heading',
          content: 'Keyboard Navigation',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Focus and keyboard',
          code: `<!-- Skip link (first element in body) -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

<!-- tabindex values -->
<!-- tabindex="0" — adds to natural tab order -->
<!-- tabindex="-1" — focusable via JS, not in tab order -->
<!-- tabindex="1+" — AVOID, overrides natural tab order -->

<!-- Ensure custom interactive elements are focusable -->
<div role="button" tabindex="0" onkeydown="handleKey(event)">
  Custom Button
</div>

<!-- Better: just use a real button -->
<button type="button">Real Button</button>`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'The first rule of ARIA: don\'t use ARIA if a native HTML element provides the behavior you need. <button> is always better than <div role="button">.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'All interactive elements must be keyboard accessible',
            'Visible focus indicators (never outline: none without replacement)',
            'Use alt text on all informational images, alt="" on decorative ones',
            'Color alone should not convey meaning (add icons or text)',
            'Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text',
            'Test with screen reader (VoiceOver, NVDA) and keyboard-only navigation',
          ],
        },
      ],
    },
    {
      id: 'forms',
      title: 'Form Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Well-structured forms use proper labels, input types, validation, and grouping for usability and accessibility.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Form structure',
          code: `<form action="/submit" method="POST" novalidate>
  <!-- Group related fields -->
  <fieldset>
    <legend>Personal Information</legend>

    <!-- Always associate labels with inputs -->
    <div>
      <label for="name">Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        autocomplete="name"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label for="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        aria-describedby="email-help"
      />
      <small id="email-help">We'll never share your email</small>
    </div>

    <div>
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        autocomplete="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
      />
    </div>
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <!-- Radio group -->
    <div role="radiogroup" aria-labelledby="plan-label">
      <p id="plan-label">Select a plan:</p>
      <label>
        <input type="radio" name="plan" value="free" checked />
        Free
      </label>
      <label>
        <input type="radio" name="plan" value="pro" />
        Professional
      </label>
    </div>

    <!-- Select -->
    <div>
      <label for="country">Country</label>
      <select id="country" name="country" autocomplete="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
      </select>
    </div>
  </fieldset>

  <button type="submit">Submit</button>
</form>`,
        },
        {
          type: 'heading',
          content: 'Input Types Reference',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'HTML5 input types',
          code: `<!-- Text inputs with proper types for mobile keyboards -->
<input type="text" />          <!-- Generic text -->
<input type="email" />         <!-- Email keyboard, built-in validation -->
<input type="tel" />           <!-- Phone keyboard -->
<input type="url" />           <!-- URL keyboard, built-in validation -->
<input type="search" />        <!-- Search with clear button -->
<input type="password" />      <!-- Masked input -->
<input type="number" />        <!-- Numeric keyboard, min/max/step -->

<!-- Date/time inputs (native pickers) -->
<input type="date" />          <!-- Date picker -->
<input type="time" />          <!-- Time picker -->
<input type="datetime-local" /><!-- Date + time picker -->

<!-- Other inputs -->
<input type="range" min="0" max="100" /> <!-- Slider -->
<input type="color" />                   <!-- Color picker -->
<input type="file" accept="image/*" />   <!-- File upload -->
<textarea rows="4"></textarea>           <!-- Multi-line text -->`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always use the most specific input type. type="email" gives mobile users an email keyboard and provides free built-in validation. type="tel" gives a phone number pad.',
        },
      ],
    },
    {
      id: 'meta-seo',
      title: 'Meta Tags & SEO',
      blocks: [
        {
          type: 'text',
          content:
            'Proper meta tags improve search engine discoverability, social media sharing, and browser behavior.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Essential meta tags',
          code: `<head>
  <!-- Character encoding (must be first) -->
  <meta charset="UTF-8" />

  <!-- Responsive viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Page info -->
  <title>Page Title — Site Name</title>
  <meta name="description" content="Concise description of the page (150-160 chars)" />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Description for social sharing" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />
  <meta name="twitter:description" content="Description for Twitter" />
  <meta name="twitter:image" content="https://example.com/image.jpg" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Canonical URL (prevent duplicate content) -->
  <link rel="canonical" href="https://example.com/page" />

  <!-- Preconnect to external origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
</head>`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The title tag is the single most important on-page SEO element. Keep it under 60 characters and include the primary keyword.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'charset must be in the first 1024 bytes of the document',
            'description meta should be 150-160 characters',
            'OG image should be at least 1200x630px',
            'Use rel="canonical" to specify the preferred URL for duplicate pages',
            'Preconnect to domains you will fetch from (fonts, CDNs)',
            'Preload fonts and critical CSS for faster rendering',
          ],
        },
      ],
    },
    {
      id: 'images',
      title: 'Image Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Optimized, responsive images improve performance and accessibility. Use modern formats, proper sizing, and semantic markup.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Responsive images',
          code: `<!-- Basic responsive image -->
<img
  src="photo.jpg"
  alt="Descriptive text about the image"
  width="800"
  height="600"
  loading="lazy"
/>

<!-- Art direction with <picture> -->
<picture>
  <source media="(min-width: 1200px)" srcset="hero-large.webp" />
  <source media="(min-width: 768px)" srcset="hero-medium.webp" />
  <img src="hero-small.webp" alt="Hero image" width="400" height="300" />
</picture>

<!-- Resolution switching with srcset -->
<img
  srcset="photo-300w.jpg 300w,
          photo-600w.jpg 600w,
          photo-1200w.jpg 1200w"
  sizes="(max-width: 600px) 300px,
         (max-width: 1200px) 600px,
         1200px"
  src="photo-600w.jpg"
  alt="Photo description"
  loading="lazy"
  decoding="async"
/>

<!-- Figure with caption -->
<figure>
  <img src="chart.png" alt="Sales chart showing 20% growth in Q4" />
  <figcaption>Figure 1: Quarterly sales growth 2024</figcaption>
</figure>`,
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Always include alt text — descriptive for informational images, empty (alt="") for decorative',
            'Always set width and height attributes to prevent layout shift (CLS)',
            'Use loading="lazy" for below-the-fold images',
            'Use decoding="async" to avoid blocking the main thread',
            'Prefer WebP/AVIF formats with <picture> fallback to JPEG/PNG',
            'Use srcset + sizes for resolution switching',
            'Use <picture> with media queries for art direction (different crops)',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never omit alt text. If an image is purely decorative, use alt="" (empty string) — this tells screen readers to skip it. Omitting alt entirely makes screen readers read the filename.',
        },
      ],
    },
    {
      id: 'lists-tables',
      title: 'Lists & Tables',
      blocks: [
        {
          type: 'text',
          content:
            'Use the correct list type for your content and proper table markup for tabular data. Screen readers announce list item counts and table structure.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'List types',
          code: `<!-- Unordered list — items with no sequence -->
<ul>
  <li>Feature one</li>
  <li>Feature two</li>
</ul>

<!-- Ordered list — sequential steps -->
<ol>
  <li>First, do this</li>
  <li>Then, do that</li>
</ol>

<!-- Description list — term/definition pairs -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>

<!-- Navigation as list (common pattern) -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Accessible table',
          code: `<table>
  <caption>Monthly expenses for 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Rent</th>
      <th scope="col">Utilities</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$1,200</td>
      <td>$150</td>
      <td>$1,350</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>$1,200</td>
      <td>$130</td>
      <td>$1,330</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$2,400</td>
      <td>$280</td>
      <td>$2,680</td>
    </tr>
  </tfoot>
</table>`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use <th scope="col"> for column headers and <th scope="row"> for row headers. The scope attribute helps screen readers associate data cells with their headers.',
        },
      ],
    },
    {
      id: 'ui-patterns',
      title: 'Common UI Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Semantic markup patterns for commonly used UI components — hero sections, cards, navigation, testimonials, and footers.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Hero section',
          code: `<section class="hero" aria-labelledby="hero-title">
  <div class="hero__content">
    <h1 id="hero-title">Welcome to Our Platform</h1>
    <p>Build something great with our tools and resources.</p>
    <a href="/get-started" class="btn btn--primary">Get Started</a>
  </div>
  <picture>
    <source media="(min-width: 768px)" srcset="hero-desktop.webp" />
    <img src="hero-mobile.webp" alt="" class="hero__image" />
  </picture>
</section>`,
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Card component',
          code: `<article class="card">
  <figure class="card__figure">
    <img
      src="product.jpg"
      alt="Product name — brief description"
      width="400"
      height="300"
      loading="lazy"
    />
  </figure>
  <div class="card__content">
    <h3 class="card__title">Product Name</h3>
    <p class="card__text">Short description of the product.</p>
    <p class="card__price">
      <span aria-label="Price">$29.99</span>
    </p>
    <a href="/product/1" class="card__link">
      View Details
      <span class="sr-only">about Product Name</span>
    </a>
  </div>
</article>`,
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Testimonial',
          code: `<section aria-labelledby="testimonials-heading">
  <h2 id="testimonials-heading">What Our Customers Say</h2>

  <figure class="testimonial">
    <blockquote>
      <p>This product changed the way I work. Highly recommended!</p>
    </blockquote>
    <figcaption class="testimonial__author">
      <img
        src="avatar.jpg"
        alt=""
        class="testimonial__photo"
        width="48"
        height="48"
      />
      <div>
        <cite>Jane Smith</cite>
        <p>CEO, TechCorp</p>
      </div>
    </figcaption>
  </figure>
</section>`,
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Footer',
          code: `<footer class="footer">
  <div class="footer__grid">
    <section>
      <h3>Company</h3>
      <nav aria-label="Company links">
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </section>

    <section>
      <h3>Support</h3>
      <nav aria-label="Support links">
        <ul>
          <li><a href="/help">Help Center</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/docs">Documentation</a></li>
        </ul>
      </nav>
    </section>

    <section>
      <h3>Legal</h3>
      <nav aria-label="Legal links">
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </nav>
    </section>
  </div>

  <p class="footer__copyright">
    <small>&copy; <time datetime="2024">2024</time> Company Name. All rights reserved.</small>
  </p>
</footer>`,
        },
      ],
    },
    {
      id: 'performance',
      title: 'Performance & Loading',
      blocks: [
        {
          type: 'text',
          content:
            'HTML structure and resource loading hints directly impact page performance. Optimize the critical rendering path with proper resource ordering.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'Resource loading',
          code: `<head>
  <!-- Critical CSS inline (above the fold) -->
  <style>
    /* Minimal critical styles */
    body { margin: 0; font-family: system-ui; }
    .hero { min-height: 100vh; }
  </style>

  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/hero.webp" as="image" />

  <!-- Preconnect to external origins -->
  <link rel="preconnect" href="https://api.example.com" />
  <link rel="dns-prefetch" href="https://analytics.example.com" />

  <!-- Main stylesheet -->
  <link rel="stylesheet" href="/style.css" />

  <!-- Defer non-critical scripts -->
  <script src="/app.js" defer></script>

  <!-- Async for independent scripts -->
  <script src="/analytics.js" async></script>
</head>`,
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'defer — download in parallel, execute after HTML parsing (preserves order)',
            'async — download in parallel, execute immediately when ready (no order guarantee)',
            'preload — high-priority fetch for current page resources',
            'preconnect — early connection to external origins (DNS + TCP + TLS)',
            'dns-prefetch — only DNS resolution (lighter than preconnect)',
            'fetchpriority="high" — boost priority of critical images/scripts',
            'loading="lazy" — defer loading until near viewport (images, iframes)',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Put <script defer> in <head> instead of at the end of <body>. It starts downloading sooner and executes after parsing — same timing, faster download.',
        },
      ],
    },
    {
      id: 'structured-data',
      title: 'Structured Data',
      blocks: [
        {
          type: 'text',
          content:
            'Structured data (JSON-LD) helps search engines understand your content and can enable rich results like star ratings, FAQs, and breadcrumbs in search results.',
        },
        {
          type: 'code',
          language: 'html',
          fileName: 'JSON-LD structured data',
          code: `<!-- Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/company",
    "https://linkedin.com/company/company"
  ]
}
</script>

<!-- Article / Blog Post -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20",
  "image": "https://example.com/article-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Company Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
</script>

<!-- FAQ Page -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is semantic HTML?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Semantic HTML uses elements that describe their meaning..."
      }
    }
  ]
}
</script>

<!-- Breadcrumbs -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Article Title" }
  ]
}
</script>`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Test your structured data with Google\'s Rich Results Test (search.google.com/test/rich-results) to validate syntax and see which rich results your pages are eligible for.',
        },
      ],
    },
  ],
}

export default html
