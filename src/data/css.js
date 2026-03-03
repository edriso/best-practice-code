const css = {
  id: 'css',
  name: 'Advanced CSS',
  description:
    'Modern CSS patterns, Sass architecture, responsive design, animations, and layout techniques',
  sections: [
    {
      id: 'sass-architecture',
      title: 'Sass 7-1 Architecture',
      blocks: [
        {
          type: 'text',
          content:
            'The 7-1 pattern organizes Sass partials into 7 folders plus one main file that imports everything. This scales well for large projects and keeps styles modular.',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'sass/',
            children: [
              {
                name: 'abstracts/',
                children: [
                  { name: '_variables.scss', comment: 'Colors, fonts, sizes' },
                  { name: '_mixins.scss', comment: 'Reusable mixins' },
                  { name: '_functions.scss', comment: 'Sass functions' },
                ],
              },
              {
                name: 'base/',
                children: [
                  { name: '_reset.scss', comment: 'Reset / normalize' },
                  { name: '_base.scss', comment: 'html, body, * defaults' },
                  { name: '_animations.scss', comment: '@keyframes' },
                  { name: '_typography.scss', comment: 'Font-face, headings' },
                  { name: '_utilities.scss', comment: 'Utility classes' },
                ],
              },
              {
                name: 'components/',
                children: [
                  { name: '_button.scss' },
                  { name: '_card.scss' },
                  { name: '_popup.scss' },
                  { name: '_story.scss' },
                ],
              },
              {
                name: 'layout/',
                children: [
                  { name: '_header.scss' },
                  { name: '_footer.scss' },
                  { name: '_navigation.scss' },
                  { name: '_grid.scss' },
                ],
              },
              {
                name: 'pages/',
                children: [{ name: '_home.scss' }, { name: '_about.scss' }],
              },
              { name: 'themes/', children: [{ name: '_theme.scss' }] },
              { name: 'vendors/', children: [{ name: '_icon-font.scss' }] },
              { name: 'main.scss', comment: 'Imports all partials' },
            ],
          },
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'main.scss',
          code: `// main.scss — single entry point
@import "abstracts/variables";
@import "abstracts/mixins";
@import "abstracts/functions";

@import "base/reset";
@import "base/base";
@import "base/animations";
@import "base/typography";
@import "base/utilities";

@import "components/button";
@import "components/card";
@import "components/popup";

@import "layout/header";
@import "layout/footer";
@import "layout/navigation";
@import "layout/grid";

@import "pages/home";
@import "pages/about";`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always import abstracts first so variables and mixins are available to all subsequent partials.',
        },
      ],
    },
    {
      id: 'sass-variables-mixins',
      title: 'Sass Variables & Mixins',
      blocks: [
        {
          type: 'text',
          content:
            'Define all design tokens as variables and create reusable mixins for responsive breakpoints, clearfix, and common patterns.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_variables.scss',
          code: `// COLORS
$color-primary: #55c57a;
$color-primary-light: #7ed56f;
$color-primary-dark: #28b485;

$color-grey-light-1: #f7f7f7;
$color-grey-light-2: #eee;
$color-grey-dark: #777;
$color-grey-dark-2: #999;
$color-grey-dark-3: #333;

$color-white: #fff;
$color-black: #000;

// FONT
$default-font-size: 1.6rem;

// GRID
$grid-width: 114rem;
$gutter-vertical: 8rem;
$gutter-vertical-small: 6rem;
$gutter-horizontal: 6rem;`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_mixins.scss',
          code: `// Responsive breakpoints
// 0-600px: Phone
// 600-900px: Tablet portrait
// 900-1200px: Tablet landscape
// 1200-1800px: Desktop (default)
// 1800px+: Big desktop

@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media only screen and (max-width: 37.5em) { @content; } // 600px
  }
  @if $breakpoint == tab-port {
    @media only screen and (max-width: 56.25em) { @content; } // 900px
  }
  @if $breakpoint == tab-land {
    @media only screen and (max-width: 75em) { @content; } // 1200px
  }
  @if $breakpoint == big-desktop {
    @media only screen and (min-width: 112.5em) { @content; } // 1800px
  }
}

// Clearfix
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

// Center block element
@mixin absCenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Usage example',
          code: `// Using variables and mixins
.header {
  background-color: $color-primary;
  font-size: $default-font-size;

  @include respond(tab-port) {
    font-size: 1.4rem;
  }

  @include respond(phone) {
    font-size: 1.2rem;
  }
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Use em units in media queries — they are consistent across browsers, unlike rem which behaves differently in Safari.',
        },
      ],
    },
    {
      id: 'bem-naming',
      title: 'BEM Naming Convention',
      blocks: [
        {
          type: 'text',
          content:
            'BEM (Block Element Modifier) creates clear, strict relationships between HTML and CSS. It prevents naming collisions and makes styles predictable.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'BEM pattern',
          code: `// Block: standalone entity
// Element: part of a block (__)
// Modifier: variant or state (--)

// HTML:
// <div class="card card--featured">
//   <img class="card__image" />
//   <h3 class="card__title">Title</h3>
//   <p class="card__text">Text</p>
//   <a class="card__link card__link--active">Read More</a>
// </div>

.card {
  background: $color-white;
  border-radius: 3px;
  overflow: hidden;

  // Modifier
  &--featured {
    border: 2px solid $color-primary;
  }

  // Elements
  &__image {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }

  &__title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1.4rem;
    color: $color-grey-dark;
  }

  &__link {
    text-decoration: none;
    color: $color-primary;

    &--active {
      font-weight: 700;
    }
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Never nest BEM elements deeper than one level. If you need .card__header__title, restructure: either make header its own block or flatten to .card__title.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Block: The top-level component (.card, .nav, .hero)',
            'Element: A child that has no standalone meaning (.card__image, .nav__link)',
            'Modifier: A variation or state (.card--featured, .nav__link--active)',
            'Use & (parent selector) in Sass for clean nesting: &__element, &--modifier',
          ],
        },
      ],
    },
    {
      id: 'responsive-design',
      title: 'Responsive Design',
      blocks: [
        {
          type: 'text',
          content:
            'Use a desktop-first approach with max-width media queries. Define breakpoints based on content, not specific devices. Use relative units (rem, em, %) for sizing.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_base.scss',
          code: `// Use 62.5% trick for easy rem calculations
// 1rem = 10px (instead of default 16px)
html {
  font-size: 62.5%; // 10px / 16px = 62.5%

  @include respond(tab-land) {
    font-size: 56.25%; // 1rem = 9px
  }

  @include respond(tab-port) {
    font-size: 50%; // 1rem = 8px
  }

  @include respond(big-desktop) {
    font-size: 75%; // 1rem = 12px
  }
}

body {
  box-sizing: border-box;
  padding: 3rem;

  @include respond(tab-port) {
    padding: 0;
  }
}

// Apply box-sizing to everything
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}`,
        },
        {
          type: 'heading',
          content: 'Float Grid System',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_grid.scss',
          code: `.row {
  max-width: $grid-width;
  margin: 0 auto;
  @include clearfix;

  &:not(:last-child) {
    margin-bottom: $gutter-vertical;

    @include respond(tab-port) {
      margin-bottom: $gutter-vertical-small;
    }
  }

  @include respond(tab-port) {
    max-width: 50rem;
  }

  // Select all columns
  [class^="col-"] {
    float: left;

    &:not(:last-child) {
      margin-right: $gutter-horizontal;

      @include respond(tab-port) {
        margin-right: 0;
        margin-bottom: $gutter-vertical-small;
      }
    }

    @include respond(tab-port) {
      width: 100% !important;
    }
  }

  .col-1-of-2 { width: calc((100% - #{$gutter-horizontal}) / 2); }
  .col-1-of-3 { width: calc((100% - 2 * #{$gutter-horizontal}) / 3); }
  .col-2-of-3 { width: calc(2 * ((100% - 2 * #{$gutter-horizontal}) / 3) + #{$gutter-horizontal}); }
  .col-1-of-4 { width: calc((100% - 3 * #{$gutter-horizontal}) / 4); }
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Modern projects should prefer CSS Grid or Flexbox over float grids. The float grid is shown for learning — see the Flexbox and CSS Grid sections for modern approaches.',
        },
      ],
    },
    {
      id: 'flexbox',
      title: 'Flexbox Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Flexbox is ideal for one-dimensional layouts — rows or columns. Use it for navigation bars, card layouts, centering, and distributing space between items.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Flexbox navigation',
          code: `// Responsive navigation with Flexbox
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__list {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  &__item {
    position: relative;
  }

  &__link {
    &:link,
    &:visited {
      text-decoration: none;
      color: $color-grey-dark;
      padding: 1.5rem 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.2s;
    }

    &:hover,
    &:active {
      background-color: $color-primary;
      color: $color-white;
    }
  }
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Flexbox sidebar layout',
          code: `// Full-page layout with sidebar
.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 18%; // don't grow, don't shrink, 18% basis
  background-color: $color-grey-dark-3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-content {
  flex: 1; // take remaining space
  display: flex;
  flex-direction: column;
}

.detail {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 4.5rem;
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Centering with Flexbox',
          code: `// Centering patterns
.center-both {
  display: flex;
  justify-content: center;
  align-items: center;
}

.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// Auto margins trick
.push-right {
  margin-left: auto;
}

// Flex grow for equal-width items
.equal-items {
  display: flex;
  gap: 2rem;

  & > * {
    flex: 1;
  }
}`,
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'flex: 0 0 <basis> — fixed width (no grow, no shrink)',
            'flex: 1 — take all available space',
            'align-self: stretch — override align-items for one item',
            'gap — modern spacing between flex items (replaces margins)',
            'order — rearrange items without changing HTML',
          ],
        },
      ],
    },
    {
      id: 'css-grid',
      title: 'CSS Grid Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'CSS Grid is ideal for two-dimensional layouts. Use it for page layouts, card grids, and complex arrangements where items span rows and columns.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Full page grid layout',
          code: `// 8-column page layout
.container {
  display: grid;
  grid-template-rows: 80vh min-content 40vw repeat(3, min-content);
  grid-template-columns:
    [sidebar-start] 8rem
    [sidebar-end full-start] minmax(6rem, 1fr)
    [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
    [center-end] minmax(6rem, 1fr)
    [full-end];

  @include respond(tab-land) {
    grid-template-rows: 6rem 80vh min-content 40vw repeat(3, min-content);
    grid-template-columns:
      [full-start] minmax(6rem, 1fr)
      [center-start] repeat(8, [col-start] minmax(min-content, 14rem) [col-end])
      [center-end] minmax(6rem, 1fr)
      [full-end];
  }
}

.header {
  grid-column: full-start / col-end 6;

  @include respond(tab-port) {
    grid-column: full-start / full-end;
  }
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
  grid-row: 1 / -1;

  @include respond(tab-land) {
    grid-column: full-start / full-end;
    grid-row: 1 / 2;
  }
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Responsive card grid',
          code: `// Auto-fit responsive grid — no media queries needed!
.features {
  grid-column: center-start / center-end;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 6rem;
  align-items: start;
}

// Gallery with varied sizes
.gallery {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(7, 5vw);
  grid-gap: 1.5rem;

  &__item {
    &--1 { grid-row: 1 / span 2; grid-column: 1 / span 2; }
    &--2 { grid-row: 1 / span 3; grid-column: 3 / span 3; }
    &--3 { grid-row: 1 / span 2; grid-column: 6 / span 1; }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use named grid lines (like [full-start] and [center-end]) for complex layouts — they make grid-column/grid-row assignments readable and maintainable.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'minmax(min-content, 1fr) — flexible but never smaller than content',
            'repeat(auto-fit, minmax(25rem, 1fr)) — responsive without media queries',
            'grid-template-areas — name regions for readable layout definitions',
            'fr unit — fraction of available space after fixed tracks',
            'Named lines [name] — reference columns/rows by name, not number',
          ],
        },
      ],
    },
    {
      id: 'animations',
      title: 'Animations & Transitions',
      blocks: [
        {
          type: 'text',
          content:
            'Use CSS transitions for simple state changes (hover, focus) and @keyframes animations for complex multi-step animations. Only animate transform and opacity for best performance.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_animations.scss',
          code: `// Keyframe animations
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-10rem);
  }
  80% {
    transform: translateX(1rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(10rem);
  }
  80% {
    transform: translateX(-1rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Applying animations',
          code: `// Heading animations
.heading-primary {
  &--main {
    animation: moveInLeft 1s ease-out;
  }

  &--sub {
    animation: moveInRight 1s ease-out;
  }
}

// Button hover with transition
.btn {
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba($color-black, 0.2);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba($color-black, 0.2);
  }

  // Invisible pseudo-element for grow effect
  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
  }

  &:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Only animate transform and opacity — these are handled by the GPU compositor and do not trigger layout or paint. Animating width, height, margin, or padding causes expensive reflows.',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'animation-fill-mode: backwards — apply 0% styles before animation starts',
            'animation-delay — stagger animations for sequential effects',
            'transition: all 0.2s — simple property transitions on hover/focus',
            'backface-visibility: hidden — fixes animation flicker in some browsers',
            'will-change: transform — hint to browser for optimization (use sparingly)',
          ],
        },
      ],
    },
    {
      id: 'clip-path-shapes',
      title: 'Clip-Path & Shapes',
      blocks: [
        {
          type: 'text',
          content:
            'clip-path creates custom shapes by clipping elements. Use polygon() for custom shapes, circle() and ellipse() for curves. Combine with transforms for creative layouts.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Clip-path patterns',
          code: `// Angled section
.header {
  height: 95vh;
  background-image:
    linear-gradient(to right bottom, rgba($color-primary-light, 0.8), rgba($color-primary-dark, 0.8)),
    url(../img/hero.jpg);
  background-size: cover;
  background-position: top;
  clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);

  @include respond(phone) {
    clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
  }
}

// Skewed section
.section-features {
  padding: 20rem 0;
  margin-top: -10rem;
  transform: skewY(-7deg);

  // Un-skew direct children
  & > * {
    transform: skewY(7deg);
  }
}

// Card flip with perspective
.card {
  perspective: 150rem;
  height: 52rem;

  &__side {
    height: 100%;
    transition: all 0.8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 3px;
    overflow: hidden;

    &--back {
      transform: rotateY(180deg);
    }
  }

  &:hover &__side--front {
    transform: rotateY(-180deg);
  }

  &:hover &__side--back {
    transform: rotateY(0);
  }
}`,
        },
        {
          type: 'code',
          language: 'scss',
          fileName: 'Background blend & filter',
          code: `// Background blend modes
.story {
  background-color: rgba($color-primary, 0.6);
  background-blend-mode: screen;
}

// Backdrop filter (glass effect)
.popup__content {
  background-color: rgba($color-white, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

// CSS filters
.gallery__img:hover {
  filter: brightness(1.1) contrast(1.1);
  transition: filter 0.3s;
}`,
        },
      ],
    },
    {
      id: 'custom-properties',
      title: 'CSS Custom Properties',
      blocks: [
        {
          type: 'text',
          content:
            'CSS custom properties (variables) are live — they cascade, inherit, and can be changed at runtime with JavaScript. Use them for theming and dynamic values.',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'Custom properties',
          code: `:root {
  --color-primary: #eb2f64;
  --color-primary-light: #ff3366;
  --color-primary-dark: #ba265d;

  --color-grey-light-1: #faf9f9;
  --color-grey-light-2: #f4f2f2;
  --color-grey-light-3: #f0eeee;
  --color-grey-light-4: #ccc;

  --color-grey-dark-1: #333;
  --color-grey-dark-2: #777;
  --color-grey-dark-3: #999;

  --shadow-dark: 0 2rem 6rem rgba(0, 0, 0, 0.3);
  --shadow-light: 0 2rem 5rem rgba(0, 0, 0, 0.06);
  --line: 1px solid var(--color-grey-light-2);
}

/* Usage */
.sidebar {
  background-color: var(--color-grey-dark-1);
}

.overview {
  border-bottom: var(--line);
  box-shadow: var(--shadow-light);
}

/* Dark theme override */
.dark-mode {
  --color-grey-light-1: #1a1a2e;
  --color-grey-light-2: #16213e;
  --color-grey-dark-1: #e0e0e0;
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'CSS custom properties vs Sass variables: Use Sass variables for compile-time values (breakpoints, calculations). Use CSS custom properties for runtime values (theming, dynamic changes).',
        },
      ],
    },
    {
      id: 'modern-css',
      title: 'Modern CSS Features',
      blocks: [
        {
          type: 'text',
          content:
            'Modern CSS has powerful features that reduce the need for preprocessors and JavaScript. Use these for cleaner, more maintainable code.',
        },
        {
          type: 'heading',
          content: 'Container Queries',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'Container queries',
          code: `/* Respond to parent container size, not viewport */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}`,
        },
        {
          type: 'heading',
          content: 'Logical Properties',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'Logical properties',
          code: `/* Writing-direction-aware properties */
.element {
  /* Instead of margin-left / margin-right */
  margin-inline: 2rem;

  /* Instead of margin-top / margin-bottom */
  margin-block: 1rem;

  /* Instead of padding-left */
  padding-inline-start: 1rem;

  /* Instead of width / height */
  inline-size: 100%;
  block-size: auto;

  /* Instead of border-top / border-bottom */
  border-block: 1px solid #ccc;
}`,
        },
        {
          type: 'heading',
          content: 'Modern Selectors',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'Modern selectors',
          code: `/* :is() — match any of the selectors (forgiving) */
:is(h1, h2, h3) {
  line-height: 1.2;
}

/* :where() — same as :is() but zero specificity */
:where(.card, .panel) p {
  margin-bottom: 1rem;
}

/* :has() — parent selector */
.card:has(img) {
  grid-template-rows: auto 1fr;
}

.form:has(:invalid) .submit-btn {
  opacity: 0.5;
  pointer-events: none;
}

/* :not() — negation */
.nav__link:not(:last-child) {
  margin-right: 2rem;
}`,
        },
        {
          type: 'heading',
          content: 'Nesting',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'Native CSS nesting',
          code: `/* Native CSS nesting — no Sass needed! */
.card {
  background: white;
  border-radius: 8px;

  & .title {
    font-size: 1.5rem;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
}`,
        },
      ],
    },
    {
      id: 'typography',
      title: 'Typography Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Good typography improves readability and visual hierarchy. Use a consistent type scale, limit font families, and set appropriate line heights.',
        },
        {
          type: 'code',
          language: 'scss',
          fileName: '_typography.scss',
          code: `// Heading styles with consistent scale
.heading-primary {
  color: $color-white;
  text-transform: uppercase;
  backface-visibility: hidden;
  margin-bottom: 6rem;

  &--main {
    display: block;
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: 3.5rem;

    @include respond(phone) {
      letter-spacing: 1rem;
      font-size: 5rem;
    }
  }

  &--sub {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1.75rem;

    @include respond(phone) {
      letter-spacing: 0.5rem;
    }
  }
}

.heading-secondary {
  font-size: 3.5rem;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  background-image: linear-gradient(
    to right,
    $color-primary-light,
    $color-primary-dark
  );
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 2px;
  transition: all 0.2s;

  @include respond(tab-port) {
    font-size: 3rem;
  }

  @include respond(phone) {
    font-size: 2.5rem;
  }

  &:hover {
    transform: skewY(2deg) skewX(15deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba($color-black, 0.2);
  }
}`,
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Use rem for font sizes — scales with user preferences',
            'Line height: 1.5-1.8 for body text, 1.1-1.3 for headings',
            'Max line width: 45-75 characters (max-width: 60ch)',
            'Limit to 2-3 font families per project',
            'Use font-display: swap in @font-face for performance',
            'Use system font stacks for body text when possible',
          ],
        },
      ],
    },
    {
      id: 'build-process',
      title: 'CSS Build Process',
      blocks: [
        {
          type: 'text',
          content:
            'A CSS build pipeline compiles Sass, adds vendor prefixes, concatenates files, and compresses for production. Modern tools like Vite handle most of this, but understanding the pipeline is valuable.',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json scripts',
          code: `{
  "scripts": {
    "watch:sass": "sass sass/main.scss css/style.css --watch",
    "compile:sass": "sass sass/main.scss css/style.comp.css",
    "prefix:css": "postcss css/style.comp.css --use autoprefixer -o css/style.prefix.css",
    "compress:css": "sass css/style.prefix.css css/style.css --style compressed",
    "build:css": "npm-run-all compile:sass prefix:css compress:css"
  }
}`,
        },
        {
          type: 'code',
          language: 'json',
          fileName: '.browserslistrc',
          code: `last 10 versions
> 1%
ie >= 9
not dead`,
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'sass',
              description: 'Dart Sass compiler (replaces node-sass)',
            },
            {
              name: 'postcss',
              description: 'CSS transformation tool',
            },
            {
              name: 'autoprefixer',
              description: 'Auto vendor prefixes based on browserslist',
            },
            {
              name: 'postcss-cli',
              description: 'CLI for postcss',
            },
            {
              name: 'npm-run-all',
              description: 'Run npm scripts sequentially or in parallel',
            },
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'If you are using Vite, Webpack, or similar bundlers, they handle Sass compilation, autoprefixing, and minification automatically. The manual pipeline above is for standalone CSS/Sass projects.',
        },
      ],
    },
  ],
}

export default css
