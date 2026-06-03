const shopifyData = {
  id: 'shopify',
  name: 'Shopify',
  description:
    'Everything a freelance Shopify developer needs — Liquid templating, Online Store 2.0 themes, sections & metafields, apps, the Storefront API, and headless commerce with Hydrogen',
  sections: [
    // ─── Section 1: What is Shopify ───────────────────────────────────
    {
      id: 'overview',
      title: 'What is Shopify',
      blocks: [
        {
          type: 'text',
          content:
            'Shopify is a hosted commerce platform — it runs the store, payments, checkout, and infrastructure for you, while you build the storefront and extend functionality. As a freelancer you mostly touch three layers: themes (the storefront UI built with Liquid), apps (custom features via the Admin/Storefront APIs), and headless builds (a custom frontend powered by Shopify as a backend).',
        },
        {
          type: 'heading',
          content: 'The three ways to build on Shopify',
        },
        {
          type: 'list',
          items: [
            'Themes — the storefront customers see. Built with Liquid + JSON templates (Online Store 2.0). This is 80% of freelance work: customizing or building themes.',
            'Apps — add features (subscriptions, reviews, custom logic) using the Admin API, webhooks, and app extensions. Built with Remix + the Shopify App template.',
            'Headless — Shopify becomes a pure backend (products, cart, checkout) and you build the frontend yourself with Hydrogen/React, Next.js, or any framework via the Storefront API.',
          ],
        },
        {
          type: 'heading',
          content: 'Key terms to know',
        },
        {
          type: 'list',
          items: [
            'Online Store 2.0 (OS 2.0) — the modern theme architecture: JSON templates, sections everywhere, app blocks, and metafields. All new work should target this.',
            'Liquid — Shopify’s templating language (open-sourced, also used by Jekyll). Renders store data into HTML.',
            'Storefront — the public-facing shop. Admin — the merchant’s back office at admin.shopify.com.',
            'Dawn — Shopify’s free reference theme. The recommended starting point for theme development.',
            'Plus — Shopify’s enterprise tier; unlocks Checkout Extensibility, Functions, scripts, and B2B.',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start every learning path at the official docs: shopify.dev. The dev docs (shopify.dev/docs) are the source of truth and stay current — the Help Center (help.shopify.com) is for merchants, not developers.',
        },
      ],
    },

    // ─── Section 2: Dev Environment & Shopify CLI ─────────────────────
    {
      id: 'dev-environment',
      title: 'Dev Environment & Shopify CLI',
      blocks: [
        {
          type: 'text',
          content:
            'The Shopify CLI is the single tool for theme and app development. It connects to a store, pulls/pushes theme files, runs a local dev server with hot reload, and scaffolds apps. You also want a free Partner account and a development store (a free, unlimited test store you create from the Partner dashboard).',
        },
        {
          type: 'heading',
          content: 'Install & authenticate',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Setup',
          code: `# Install the Shopify CLI (Node 18+ required)
npm install -g @shopify/cli@latest

# Check the version
shopify version

# Log in (opens a browser; pick your Partner org + store)
shopify auth login`,
        },
        {
          type: 'heading',
          content: 'Theme development workflow',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Theme commands',
          code: `# Scaffold a new theme from Dawn (Shopify's reference theme)
shopify theme init my-store-theme

cd my-store-theme

# Start local dev server with hot reload + theme editor preview
# Prompts you to select a store the first time
shopify theme dev --store your-store.myshopify.com

# Pull the live theme's files down to edit locally
shopify theme pull

# Push local changes up to an UNPUBLISHED theme (safe)
shopify theme push --unpublished

# Push to a specific theme by id
shopify theme push --theme 123456789

# Check for Liquid/JSON/performance issues (Theme Check)
shopify theme check`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never run “shopify theme push” straight to the live theme without testing. Always push to an unpublished theme (--unpublished), preview it, then publish from the theme editor. Treat the live theme like production.',
        },
        {
          type: 'heading',
          content: 'Recommended tooling',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'Shopify CLI',
              description:
                'The official command-line tool for theme + app development. Local dev server, hot reload, scaffolding.',
              url: 'https://shopify.dev/docs/api/shopify-cli',
            },
            {
              name: 'Shopify Liquid (VS Code)',
              description:
                'Official VS Code extension — Liquid syntax highlighting, autocomplete, and Theme Check integration.',
              url: 'https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode',
            },
            {
              name: 'Theme Check',
              description:
                'A linter for Liquid themes — catches deprecated tags, missing translations, and performance issues.',
              url: 'https://shopify.dev/docs/storefronts/themes/tools/theme-check',
            },
            {
              name: 'Theme Inspector (Chrome)',
              description:
                'Profiles Liquid render performance in the browser — find slow sections and snippets.',
              url: 'https://shopify.dev/docs/storefronts/themes/tools/theme-inspector',
            },
          ],
        },
      ],
    },

    // ─── Section 3: Theme Architecture (OS 2.0) ───────────────────────
    {
      id: 'theme-architecture',
      title: 'Theme Architecture (Online Store 2.0)',
      blocks: [
        {
          type: 'text',
          content:
            'Every Shopify theme follows a fixed folder structure. The theme editor (the drag-and-drop customizer merchants use) reads these folders. Understanding what each does is the foundation of all theme work.',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'theme/',
            children: [
              {
                name: 'layout',
                comment: 'Page wrappers',
                children: [
                  { name: 'theme.liquid', comment: 'Main HTML shell — <head>, header, footer, {{ content_for_layout }}' },
                  { name: 'password.liquid', comment: 'Storefront when store is password-protected' },
                ],
              },
              {
                name: 'templates',
                comment: 'One per page type (JSON in OS 2.0)',
                children: [
                  { name: 'index.json', comment: 'Homepage' },
                  { name: 'product.json', comment: 'Product page' },
                  { name: 'collection.json', comment: 'Collection (category) page' },
                  { name: 'cart.json', comment: 'Cart page' },
                  { name: 'page.json', comment: 'Generic pages' },
                  { name: 'page.contact.json', comment: 'Alternate template (suffix)' },
                  { name: 'customers', comment: 'Account, login, register templates' },
                ],
              },
              {
                name: 'sections',
                comment: 'Reusable, customizable building blocks',
                children: [
                  { name: 'header.liquid' },
                  { name: 'main-product.liquid', comment: 'Product page section' },
                  { name: 'featured-collection.liquid' },
                ],
              },
              {
                name: 'snippets',
                comment: 'Small reusable bits, included via {% render %}',
                children: [
                  { name: 'product-card.liquid' },
                  { name: 'price.liquid' },
                ],
              },
              {
                name: 'blocks',
                comment: 'Theme blocks (newest reusable unit, nestable)',
                children: [{ name: 'text.liquid' }],
              },
              {
                name: 'config',
                comment: 'Theme-wide settings',
                children: [
                  { name: 'settings_schema.json', comment: 'Defines theme settings UI' },
                  { name: 'settings_data.json', comment: 'Saved setting values' },
                ],
              },
              {
                name: 'locales',
                comment: 'Translation files (i18n)',
                children: [
                  { name: 'en.default.json' },
                  { name: 'fr.json' },
                ],
              },
              {
                name: 'assets',
                comment: 'CSS, JS, images, fonts',
                children: [
                  { name: 'theme.css' },
                  { name: 'global.js' },
                ],
              },
            ],
          },
        },
        {
          type: 'heading',
          content: 'How a page renders',
        },
        {
          type: 'list',
          items: [
            'A URL maps to a template (e.g. /products/shirt → templates/product.json).',
            'The JSON template lists which sections to render and in what order.',
            'Each section pulls in snippets and theme blocks, and exposes settings to the theme editor.',
            'Everything is wrapped by layout/theme.liquid, where {{ content_for_layout }} injects the template output.',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'JSON templates are what make OS 2.0 powerful: merchants can add, remove, and reorder sections on ANY page (not just the homepage) without touching code. When you build, think in sections.',
        },
      ],
    },

    // ─── Section 4: Liquid Basics ─────────────────────────────────────
    {
      id: 'liquid-basics',
      title: 'Liquid Basics',
      blocks: [
        {
          type: 'text',
          content:
            'Liquid is Shopify’s templating language. It has three building blocks: objects (output data), tags (logic), and filters (transform data). Liquid runs on Shopify’s servers and outputs plain HTML — there is no “run it locally” without a store, which is why the CLI dev server is essential.',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'The three building blocks',
          code: `{% comment %} 1. OBJECTS — output data with double curly braces {% endcomment %}
{{ product.title }}
{{ product.price | money }}

{% comment %} 2. TAGS — logic with curly-percent. No output by themselves {% endcomment %}
{% if product.available %}
  In stock
{% else %}
  Sold out
{% endif %}

{% comment %} 3. FILTERS — transform output with the pipe | character {% endcomment %}
{{ product.title | upcase }}              {# SHIRT #}
{{ product.price | money }}               {# $29.00 #}
{{ 'theme.css' | asset_url | stylesheet_tag }}
{{ product.featured_image | image_url: width: 600 | image_tag }}`,
        },
        {
          type: 'heading',
          content: 'Variables & assignment',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Variables',
          code: `{% comment %} assign creates a variable {% endcomment %}
{% assign sale_price = product.price | times: 0.8 %}
{{ sale_price | money }}

{% comment %} capture stores a block of markup in a variable {% endcomment %}
{% capture full_name %}{{ customer.first_name }} {{ customer.last_name }}{% endcapture %}

{% comment %} liquid tag lets you write multiple lines without {% %} each time {% endcomment %}
{% liquid
  assign discount = 0.1
  assign final = product.price | times: discount
  if product.available
    echo 'Available'
  endif
%}`,
        },
        {
          type: 'heading',
          content: 'render vs include',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Including snippets',
          code: `{% comment %}
  Use {% render %} — it isolates scope (the snippet only sees variables you pass).
  {% include %} is DEPRECATED — it leaks the parent scope and is slower.
{% endcomment %}

{% render 'product-card', product: product, show_vendor: true %}

{% comment %} Loop + render a snippet for each item {% endcomment %}
{% for product in collection.products %}
  {% render 'product-card', product: product %}
{% endfor %}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always use {% render %}, never {% include %}. Theme Check flags include as deprecated. render is faster (cached) and prevents hard-to-debug variable leaks between snippets.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Bookmark the Liquid reference: shopify.dev/docs/api/liquid. It documents every object, tag, and filter with examples. You will use it constantly.',
        },
      ],
    },

    // ─── Section 5: Liquid Objects, Filters & Control Flow ────────────
    {
      id: 'liquid-deep-dive',
      title: 'Liquid Objects, Filters & Loops',
      blocks: [
        {
          type: 'text',
          content:
            'Most theme work is reading the right object and formatting it with the right filter. These are the objects and patterns you reach for daily.',
        },
        {
          type: 'heading',
          content: 'Global objects (available everywhere)',
        },
        {
          type: 'list',
          items: [
            'product — the current product (title, price, variants, images, description, metafields).',
            'collection — the current collection and its .products.',
            'cart — line items, total_price, item_count.',
            'customer — logged-in customer (name, email, orders). Null if logged out.',
            'shop — store-wide info (name, currency, domain, email).',
            'settings — values from your settings_schema.json (theme settings).',
            'section — the current section’s settings and blocks (inside a section file).',
            'request — page_type, host, locale, design_mode (true inside theme editor).',
          ],
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Loops & pagination',
          code: `{% comment %} Loop over products, with forloop helpers {% endcomment %}
{% for product in collection.products %}
  {{ forloop.index }} / {{ forloop.length }} — {{ product.title }}
  {% if forloop.first %}(first){% endif %}
  {% if forloop.last %}(last){% endif %}
{% else %}
  No products found.
{% endfor %}

{% comment %} Paginate large lists (max 50 per page for products) {% endcomment %}
{% paginate collection.products by 24 %}
  {% for product in collection.products %}
    {% render 'product-card', product: product %}
  {% endfor %}
  {{ paginate | default_pagination }}
{% endpaginate %}`,
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Commonly used filters',
          code: `{# Money #}
{{ 2999 | money }}                      {# $29.99 #}
{{ 2999 | money_without_currency }}     {# 29.99 #}

{# Strings #}
{{ product.title | handle }}            {# url-safe-slug #}
{{ product.description | strip_html | truncatewords: 30 }}
{{ 'hello world' | capitalize }}

{# Arrays #}
{{ collection.products | size }}
{{ products | where: 'available', true | map: 'title' | join: ', ' }}
{{ collection.products | sort: 'price' | reverse }}

{# URLs & assets #}
{{ product.url }}
{{ 'logo.png' | asset_url }}
{{ product.featured_image | image_url: width: 800 | image_tag: loading: 'lazy' }}

{# Dates #}
{{ order.created_at | date: '%B %d, %Y' }}   {# June 03, 2026 #}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'For images always use image_url with a width plus image_tag — it generates responsive srcset and lazy loading automatically. Never hardcode full-size images; it tanks performance and Core Web Vitals.',
        },
      ],
    },

    // ─── Section 6: Sections & Blocks ─────────────────────────────────
    {
      id: 'sections-blocks',
      title: 'Sections, Blocks & JSON Templates',
      blocks: [
        {
          type: 'text',
          content:
            'Sections are the heart of OS 2.0. A section is a Liquid file with a {% schema %} block that defines its settings and which blocks it accepts. The merchant configures it visually in the theme editor — no code needed. This is the #1 skill clients pay for: building flexible, merchant-editable sections.',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'sections/featured-text.liquid',
          code: `{%- comment -%} 1. Markup — uses section.settings and section.blocks {%- endcomment -%}
<div class="featured-text" style="background: {{ section.settings.bg_color }}">
  <h2>{{ section.settings.heading }}</h2>

  {%- for block in section.blocks -%}
    <p {{ block.shopify_attributes }}>{{ block.settings.text }}</p>
  {%- endfor -%}
</div>

{%- comment -%} 2. Schema — defines the editor UI for this section {%- endcomment -%}
{% schema %}
{
  "name": "Featured Text",
  "tag": "section",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "Welcome" },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "paragraph",
      "name": "Paragraph",
      "settings": [
        { "type": "richtext", "id": "text", "label": "Text" }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [
    { "name": "Featured Text" }
  ]
}
{% endschema %}`,
        },
        {
          type: 'heading',
          content: 'Key schema concepts',
        },
        {
          type: 'list',
          items: [
            'settings — the inputs shown in the editor (text, richtext, image_picker, color, range, select, checkbox, url, collection, product, etc.).',
            'blocks — repeatable sub-units the merchant can add/remove/reorder within the section.',
            'presets — make the section appear in the editor’s “Add section” menu. Without a preset, it can’t be added by merchants.',
            '@app block type — lets installed apps inject content into your section (app blocks).',
            'shopify_attributes — always output {{ block.shopify_attributes }} on a block’s wrapper so the editor can select/highlight it.',
          ],
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'templates/index.json (homepage)',
          code: `{
  "sections": {
    "hero": {
      "type": "image-banner",
      "settings": { "heading": "Summer Sale" }
    },
    "featured": {
      "type": "featured-collection",
      "settings": { "collection": "frontpage" }
    }
  },
  "order": ["hero", "featured"]
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Theme blocks (the /blocks folder) are the newest evolution — they are reusable across sections and can be nested. For most freelance theme work, section-level blocks (defined inline in the schema) are still the bread and butter. Learn sections first, then theme blocks.',
        },
      ],
    },

    // ─── Section 7: Metafields & Metaobjects ──────────────────────────
    {
      id: 'metafields',
      title: 'Metafields & Metaobjects',
      blocks: [
        {
          type: 'text',
          content:
            'Metafields add custom data to Shopify resources (products, collections, customers, orders, the shop itself) without an app. Metaobjects let you define entirely custom content types (e.g. “Size Guide”, “Author”, “FAQ”). Together they replace dozens of old apps and are essential for modern, content-rich stores.',
        },
        {
          type: 'heading',
          content: 'Reading metafields in Liquid',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Metafields',
          code: `{% comment %}
  Defined under Settings > Custom data in the admin.
  Access pattern: resource.metafields.NAMESPACE.KEY
{% endcomment %}

{# Simple text metafield #}
<p>Care: {{ product.metafields.custom.care_instructions }}</p>

{# Typed metafields expose .value and .type #}
{% assign warranty = product.metafields.custom.warranty %}
{% if warranty %}
  <span>{{ warranty.value }}</span>
{% endif %}

{# Rich text metafield needs no extra filter — renders HTML #}
{{ product.metafields.custom.full_description }}

{# A list metafield (list.product_reference) #}
{% for related in product.metafields.custom.related_products.value %}
  {% render 'product-card', product: related %}
{% endfor %}`,
        },
        {
          type: 'heading',
          content: 'Metaobjects (custom content types)',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Metaobjects',
          code: `{% comment %}
  Define a metaobject type "size_guide" in Settings > Custom data > Metaobjects.
  Then connect it to products via a metaobject_reference metafield.
{% endcomment %}

{% assign guide = product.metafields.custom.size_guide.value %}
{% if guide %}
  <h3>{{ guide.title }}</h3>
  {{ guide.body }}
  {% for row in guide.measurements.value %}
    <tr><td>{{ row }}</td></tr>
  {% endfor %}
{% endif %}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'When a client asks for “custom fields on products”, “a team/author section”, or “structured FAQs”, the answer is almost always metafields + metaobjects — not a paid app and not hardcoding. Expose them as section settings so the merchant can manage content themselves.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'Metafields docs',
              description:
                'Full reference for metafield types, namespaces, and Liquid access patterns.',
              url: 'https://shopify.dev/docs/apps/build/custom-data/metafields',
            },
            {
              name: 'Metaobjects docs',
              description:
                'Define and render custom content structures without an app.',
              url: 'https://shopify.dev/docs/apps/build/custom-data/metaobjects',
            },
          ],
        },
      ],
    },

    // ─── Section 8: Theme Settings & Customization ────────────────────
    {
      id: 'theme-settings',
      title: 'Theme Settings & Customization',
      blocks: [
        {
          type: 'text',
          content:
            'config/settings_schema.json defines the global theme settings (colors, typography, layout) merchants see under “Theme settings” in the editor. These are read in Liquid via the global settings object. This is how you make a theme brandable without code edits.',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'config/settings_schema.json (excerpt)',
          code: `[
  {
    "name": "Colors",
    "settings": [
      { "type": "color", "id": "color_primary", "label": "Primary", "default": "#1a1a1a" },
      { "type": "color_background", "id": "gradient_bg", "label": "Background gradient" }
    ]
  },
  {
    "name": "Typography",
    "settings": [
      { "type": "font_picker", "id": "heading_font", "label": "Headings", "default": "assistant_n4" },
      { "type": "range", "id": "base_size", "label": "Base size", "min": 12, "max": 20, "step": 1, "unit": "px", "default": 16 }
    ]
  }
]`,
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'Using settings in theme.liquid',
          code: `<style>
  :root {
    --color-primary: {{ settings.color_primary }};
    --base-size: {{ settings.base_size }}px;
  }
</style>

{% comment %} font_picker pairs with font_face / font_url filters {% endcomment %}
{{ settings.heading_font | font_face: font_display: 'swap' }}`,
        },
        {
          type: 'heading',
          content: 'Useful setting input types',
        },
        {
          type: 'list',
          items: [
            'text / textarea / richtext — text inputs (richtext returns HTML).',
            'image_picker — merchant uploads/selects an image; returns an image object.',
            'color / color_background — color and gradient pickers.',
            'range — slider with min/max/step/unit.',
            'select / radio / checkbox — choices and toggles.',
            'url / collection / product / blog / page — resource pickers that return the linked object.',
            'font_picker — Shopify’s font library, paired with the font_face filter.',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Golden rule of client work: anything the merchant might want to change (text, images, colors, which collection to feature) should be a setting — not hardcoded. A theme they can edit themselves means fewer “can you change this word” emails and a happier client.',
        },
      ],
    },

    // ─── Section 9: Practical Customization Recipes ───────────────────
    {
      id: 'recipes',
      title: 'Practical Customization Recipes',
      blocks: [
        {
          type: 'text',
          content:
            'A grab-bag of the small, high-frequency tasks clients actually request. These show real Liquid in context.',
        },
        {
          type: 'heading',
          content: 'Show a sale badge with % off',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'snippets/sale-badge.liquid',
          code: `{%- if product.compare_at_price > product.price -%}
  {%- assign saved = product.compare_at_price | minus: product.price -%}
  {%- assign pct = saved | times: 100.0 | divided_by: product.compare_at_price | round -%}
  <span class="badge badge--sale">Save {{ pct }}%</span>
{%- endif -%}`,
        },
        {
          type: 'heading',
          content: 'Free-shipping progress bar in the cart',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'In a cart section',
          code: `{%- assign threshold = 5000 -%}{# $50.00 in cents #}
{%- if cart.total_price >= threshold -%}
  <p>\u{1F389} You’ve unlocked free shipping!</p>
{%- else -%}
  {%- assign remaining = threshold | minus: cart.total_price -%}
  <p>Add {{ remaining | money }} more for free shipping.</p>
{%- endif -%}`,
        },
        {
          type: 'heading',
          content: 'Conditional content by page type',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'layout/theme.liquid',
          code: `{%- case request.page_type -%}
  {%- when 'index' -%}
    {% comment %} homepage-only banner {% endcomment %}
  {%- when 'product' -%}
    {% comment %} product-only widget {% endcomment %}
  {%- when 'cart' -%}
    {% comment %} cart-only upsell {% endcomment %}
{%- endcase -%}`,
        },
        {
          type: 'heading',
          content: 'Hide content inside the theme editor (or only show there)',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'design_mode',
          code: `{%- if request.design_mode -%}
  {% comment %} only visible while editing in the theme editor {% endcomment %}
  <p class="editor-hint">Add blocks to populate this section.</p>
{%- endif -%}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'For cart updates without a page reload (add to cart, quantity changes), use the Cart AJAX API: POST to /cart/add.js, /cart/change.js, /cart/update.js. These return JSON. Don’t reinvent it — Dawn already ships robust cart JS you can adapt.',
        },
      ],
    },

    // ─── Section 10: Apps Overview ────────────────────────────────────
    {
      id: 'apps',
      title: 'Apps: When Themes Aren’t Enough',
      blocks: [
        {
          type: 'text',
          content:
            'When a feature needs server-side logic, background jobs, external integrations, or data Shopify doesn’t store, you build an app. Apps talk to Shopify through the Admin API (GraphQL) and react to events via webhooks. The official template is built on Remix and is the fastest way to start.',
        },
        {
          type: 'heading',
          content: 'App types',
        },
        {
          type: 'list',
          items: [
            'Custom app — built for a single store, installed directly from its admin. Most freelance app work is this.',
            'Public app — listed on the Shopify App Store, installable by any merchant (OAuth, billing, review process).',
            'Theme app extension — the modern way an app injects UI into a theme via app blocks (no editing the merchant’s theme code).',
            'Admin / checkout / customer-account UI extensions — surface app UI inside Shopify’s own admin and checkout.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Scaffold an app',
          code: `# Create a new app (Remix template, recommended)
shopify app init

# Run it locally — installs on your dev store via a tunnel
shopify app dev

# Generate an extension (theme app block, function, admin UI, etc.)
shopify app generate extension

# Deploy app + extensions
shopify app deploy`,
        },
        {
          type: 'code',
          language: 'graphql',
          fileName: 'Admin GraphQL — fetch products',
          code: `query GetProducts {
  products(first: 10, query: "status:active") {
    edges {
      node {
        id
        title
        totalInventory
        variants(first: 5) {
          edges { node { id price sku } }
        }
      }
    }
  }
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'The Admin API is GraphQL-first now — the REST Admin API is legacy and being wound down. Build new apps against the GraphQL Admin API. Use webhooks (orders/create, products/update, app/uninstalled) instead of polling.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@shopify/shopify-app-remix',
              description:
                'Official Remix adapter — handles OAuth, sessions, webhooks, and authenticated API calls.',
              url: 'https://shopify.dev/docs/api/shopify-app-remix',
            },
            {
              name: 'Polaris',
              description:
                'Shopify’s React design system — build admin UIs that look native to the Shopify admin.',
              url: 'https://polaris.shopify.com',
            },
            {
              name: 'Admin GraphQL API',
              description:
                'The primary API for reading/writing store data (products, orders, customers, inventory).',
              url: 'https://shopify.dev/docs/api/admin-graphql',
            },
          ],
        },
      ],
    },

    // ─── Section 11: Storefront API ───────────────────────────────────
    {
      id: 'storefront-api',
      title: 'The Storefront API',
      blocks: [
        {
          type: 'text',
          content:
            'The Storefront API is a public, customer-facing GraphQL API for reading products/collections and managing a cart + checkout. It’s the foundation of every headless build and of dynamic, JS-driven storefront features. Unlike the Admin API, it’s designed to be safe to call from the browser with a public access token.',
        },
        {
          type: 'code',
          language: 'graphql',
          fileName: 'Storefront query — product by handle',
          code: `query ProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    descriptionHtml
    featuredImage { url altText }
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    variants(first: 100) {
      nodes { id title availableForSale price { amount } }
    }
  }
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Calling it from JS',
          code: `const res = await fetch(
  'https://your-store.myshopify.com/api/2025-01/graphql.json',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Public Storefront access token (safe in the browser)
      'X-Shopify-Storefront-Access-Token': PUBLIC_TOKEN,
    },
    body: JSON.stringify({
      query: PRODUCT_QUERY,
      variables: { handle: 'classic-tee' },
    }),
  }
);

const { data } = await res.json();
console.log(data.product.title);`,
        },
        {
          type: 'heading',
          content: 'The Cart API (headless checkout)',
        },
        {
          type: 'list',
          items: [
            'cartCreate — start a cart and get a cart id + checkoutUrl.',
            'cartLinesAdd / cartLinesUpdate / cartLinesRemove — manage line items.',
            'Redirect the customer to cart.checkoutUrl — Shopify hosts the secure, PCI-compliant checkout. You never build the payment step yourself.',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Pin an API version in the URL (e.g. 2025-01) and update it deliberately. Shopify releases a new version quarterly and supports each for ~12 months. Never call the “unstable” version in production.',
        },
      ],
    },

    // ─── Section 12: Headless Commerce & Hydrogen ─────────────────────
    {
      id: 'headless',
      title: 'Headless Commerce & Hydrogen',
      blocks: [
        {
          type: 'text',
          content:
            'Headless means you decouple the frontend from Shopify: Shopify stays the backend (catalog, cart, checkout, orders) and you build a fully custom storefront with your own framework. You get total design/performance control and can integrate any CMS or stack — at the cost of building and hosting the frontend yourself. Hydrogen is Shopify’s official React framework (built on Remix) for exactly this, and Oxygen is Shopify’s free global hosting for Hydrogen.',
        },
        {
          type: 'heading',
          content: 'When to go headless (and when not to)',
        },
        {
          type: 'list',
          items: [
            'Go headless when: the client needs a highly custom design, a content-heavy site (CMS-driven), unusual UX, or a storefront that must share a codebase with a larger app.',
            'Stay on a theme when: the budget is modest, the merchant needs to self-edit easily, time-to-launch matters, or requirements are standard ecommerce. Themes are cheaper, faster, and lower-maintenance — most stores should use one.',
            'Headless trade-offs: you own hosting, performance, SEO, and the upgrade treadmill; merchants lose the visual theme editor; some apps don’t support headless.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Start a Hydrogen storefront',
          code: `# Scaffold a Hydrogen app (React + Remix + Vite)
npm create @shopify/hydrogen@latest

cd my-storefront
npm install
npm run dev

# Deploy to Oxygen (Shopify's free hosting) — or to Vercel/Netlify/etc.
npx shopify hydrogen deploy`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/routes/products.$handle.jsx (Hydrogen)',
          code: `import { useLoaderData } from '@remix-run/react';

export async function loader({ params, context }) {
  // context.storefront is the typed Storefront API client Hydrogen provides
  const { product } = await context.storefront.query(PRODUCT_QUERY, {
    variables: { handle: params.handle },
  });
  return { product };
}

export default function Product() {
  const { product } = useLoaderData();
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.priceRange.minVariantPrice.amount}</p>
    </div>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'You don’t have to use Hydrogen for headless. Next.js + the Storefront API is a very common (and well-documented) combo, especially when the team already knows Next. Hydrogen’s advantage is built-in Shopify utilities, caching, and free Oxygen hosting.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'Hydrogen',
              description:
                'Shopify’s React/Remix framework for headless storefronts, with Storefront API helpers built in.',
              url: 'https://shopify.dev/docs/storefronts/headless/hydrogen',
            },
            {
              name: '@shopify/hydrogen-react',
              description:
                'Framework-agnostic React components/hooks (CartProvider, Money, Image) — use in Next.js too.',
              url: 'https://shopify.dev/docs/api/hydrogen-react',
            },
            {
              name: 'Storefront API',
              description:
                'The GraphQL API every headless storefront is built on.',
              url: 'https://shopify.dev/docs/api/storefront',
            },
          ],
        },
      ],
    },

    // ─── Section 13: Checkout Extensibility & Functions ───────────────
    {
      id: 'checkout',
      title: 'Checkout Extensibility & Functions',
      blocks: [
        {
          type: 'text',
          content:
            'Shopify’s checkout is locked down for security and conversion — you can’t edit checkout.liquid anymore (it was deprecated). Instead you customize checkout with Checkout UI Extensions (add fields, banners, upsells) and change checkout logic with Shopify Functions (discounts, shipping, payment customizations) written in Rust or JS and run on Shopify’s servers in milliseconds.',
        },
        {
          type: 'heading',
          content: 'The modern toolkit',
        },
        {
          type: 'list',
          items: [
            'Checkout UI Extensions — React-based UI injected at defined checkout slots (add a gift-message field, trust badges, custom upsell).',
            'Shopify Functions — custom backend logic: discount functions, delivery/payment customization, cart transforms, validation. Fast, sandboxed, no server to host.',
            'Branding API & checkout editor — let merchants style checkout visually.',
            'Note: full Checkout Extensibility + Functions on checkout require Shopify Plus for some surfaces; discount/cart Functions are broadly available.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Generate checkout extensions/functions',
          code: `# Inside an app project
shopify app generate extension

# Pick from: Checkout UI, Cart and checkout validation,
# Product discount / Order discount / Shipping discount (Functions),
# Delivery / Payment customization, etc.`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'If a job post mentions “checkout.liquid customization”, that approach is deprecated and being removed. The correct answer is Checkout UI Extensions + Functions. Knowing this distinction signals you’re current — many devs still aren’t.',
        },
      ],
    },

    // ─── Section 14: Performance & SEO ────────────────────────────────
    {
      id: 'performance-seo',
      title: 'Performance & SEO',
      blocks: [
        {
          type: 'text',
          content:
            'Store speed directly affects conversion and Google ranking. Shopify scores themes on Core Web Vitals and shows a Lighthouse-style speed report in the admin. Performance is a recurring paid task — clients ask for “my store is slow, fix it” constantly.',
        },
        {
          type: 'heading',
          content: 'Performance checklist',
        },
        {
          type: 'list',
          items: [
            'Use image_url with width + image_tag for responsive srcset; add loading="lazy" below the fold and width/height to avoid layout shift (CLS).',
            'Defer non-critical JS (defer/async); avoid render-blocking scripts in <head>.',
            'Minimize apps — each installed app often injects its own JS/CSS into every page. Audit and remove unused ones.',
            'Use {% render %} (cached) over {% include %}; avoid expensive loops over large product lists in Liquid.',
            'Preload the hero image and key fonts; subset/limit web fonts.',
            'Profile with the Theme Inspector Chrome extension to find slow Liquid; use Lighthouse / the admin speed report for the full picture.',
          ],
        },
        {
          type: 'heading',
          content: 'SEO essentials',
        },
        {
          type: 'code',
          language: 'liquid',
          fileName: 'SEO basics in theme.liquid',
          code: `<title>
  {{ page_title }}{% if current_tags %} &ndash; {{ current_tags | join: ', ' }}{% endif %}
  {% unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless %}
</title>

<meta name="description" content="{{ page_description | default: shop.description | escape }}">

{# Canonical URL — prevents duplicate-content penalties #}
<link rel="canonical" href="{{ canonical_url }}">

{# Open Graph for social sharing #}
<meta property="og:title" content="{{ page_title | escape }}">
<meta property="og:image" content="{{ page_image | image_url: width: 1200 }}">`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Shopify auto-generates /sitemap.xml and robots.txt (editable via robots.txt.liquid). Add structured data (JSON-LD Product/Offer schema) on product pages for rich results — Dawn includes it; verify it’s present and accurate.',
        },
      ],
    },

    // ─── Section 15: Freelance Workflow & Deliverables ────────────────
    {
      id: 'freelance-workflow',
      title: 'Freelance Workflow & Deliverables',
      blocks: [
        {
          type: 'text',
          content:
            'Beyond code, getting hired and keeping clients happy is its own skill. Here’s the practical side of Shopify freelancing — how engagements work, what to charge for, and how to deliver without breaking a live store.',
        },
        {
          type: 'heading',
          content: 'Common job types (cheapest → most valuable)',
        },
        {
          type: 'list',
          items: [
            'Small tweaks — text/color/layout edits, adding a section, fixing a bug. Quick wins, often hourly or flat fee.',
            'Theme customization — building custom sections, integrating a design, restyling a premium theme. The bread and butter.',
            'Full theme build / store setup — from a Figma design or from scratch on Dawn. Project-based.',
            'App integration & custom apps — connecting third-party services, building private apps for store-specific logic.',
            'Headless builds — Hydrogen/Next storefronts. Highest rate, requires the most skill.',
            'Maintenance retainers — ongoing updates, performance, new campaigns. The most stable income.',
          ],
        },
        {
          type: 'heading',
          content: 'Safe delivery workflow (protect the live store)',
        },
        {
          type: 'list',
          items: [
            'Duplicate the live theme first, or pull it via the CLI — always work on a copy, never the published theme.',
            'Develop locally with shopify theme dev; push to an unpublished theme for client review (share the preview link).',
            'Use version control: commit theme files to Git even though Shopify isn’t Git-native. Keep settings_data.json out of noisy diffs if it changes per-store.',
            'For client access, ask to be added as a Staff member, or work via Collaborator access from your Partner account (preferred — no password sharing).',
            'Publish only after sign-off, ideally during low-traffic hours, and keep the previous theme as a one-click rollback.',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Request Collaborator access (Partner dashboard → request access to the store) instead of the client’s login. It’s the professional standard, lets you scope permissions, and means you don’t hold their credentials. It also keeps your work attributable in their store activity log.',
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Where the jobs are: the Shopify Partner Directory (Experts Marketplace), Upwork, and Shopify-specific communities. A free Partner account also gives you unlimited development stores to build your portfolio and demos.',
        },
      ],
    },

    // ─── Section 16: Reference & Where to Learn ───────────────────────
    {
      id: 'resources',
      title: 'Reference & Where to Learn',
      blocks: [
        {
          type: 'text',
          content:
            'Bookmark these. Shopify’s platform changes quarterly, so the official docs are always the safest source — tutorials age fast.',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'shopify.dev (Dev Docs)',
              description:
                'The source of truth for everything: themes, Liquid, apps, APIs, Hydrogen. Start here.',
              url: 'https://shopify.dev/docs',
            },
            {
              name: 'Liquid Reference',
              description:
                'Every object, tag, and filter with examples. Your daily lookup while building themes.',
              url: 'https://shopify.dev/docs/api/liquid',
            },
            {
              name: 'Theme Architecture Docs',
              description:
                'OS 2.0 themes — folder structure, sections, blocks, JSON templates, settings.',
              url: 'https://shopify.dev/docs/storefronts/themes',
            },
            {
              name: 'Dawn (reference theme)',
              description:
                'Shopify’s open-source flagship theme on GitHub. Read its code to learn best practices.',
              url: 'https://github.com/Shopify/dawn',
            },
            {
              name: 'Shopify CLI Reference',
              description:
                'All theme and app commands, flags, and workflows.',
              url: 'https://shopify.dev/docs/api/shopify-cli',
            },
            {
              name: 'Hydrogen + Headless',
              description:
                'Headless storefronts with Hydrogen, Oxygen, and the Storefront API.',
              url: 'https://shopify.dev/docs/storefronts/headless',
            },
            {
              name: 'GraphiQL App',
              description:
                'Install the Shopify GraphiQL app to explore and test Admin/Storefront API queries live against a store.',
              url: 'https://shopify-graphiql-app.shopifycloud.com/login',
            },
            {
              name: 'Partner Academy',
              description:
                'Free courses + certifications (Theme Developer, App Developer) — great for credibility with clients.',
              url: 'https://www.shopify.com/partners/academy',
            },
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Learning path: (1) build a theme on Dawn with the CLI, (2) master Liquid + sections + metafields, (3) learn the Storefront API, (4) then branch into apps or headless depending on the work you want. Ship a demo store to your portfolio at each stage.',
        },
      ],
    },
  ],
}

export default shopifyData
