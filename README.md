# Appinion Admin — admin theme (HTML + Tailwind CSS)

Static admin template: **plain HTML, Tailwind CSS 3, one 80-line vanilla JS file** (`src/app.js`). No jQuery, no framework.
It is meant to be copied into Laravel (Blade), Vue or React projects.

## Pages
`index.html` (dashboard) · `leads.html` · `applications.html` · `pipeline.html` · `calendar.html` · `analytics.html` · `settings.html` · `components.html` (living reference of every component)

## Build
```bash
npm install
npm run dev      # watch
npm run build    # minified dist/styles.css
```
Tailwind scans `./*.html` and `./src/**/*.js` — add your own template paths (e.g. `resources/views/**/*.blade.php`, `src/**/*.vue`) in `tailwind.config.js`.

## Design tokens
All colours live as CSS variables in `src/input.css` (`:root` = light, `.dark` = dark) and are mapped to Tailwind names in `tailwind.config.js`
(`bg-surface`, `text-muted`, `border-line`, `bg-ember-soft`, …). Re-skinning = edit the variables. Dark mode = `class="dark"` on `<html>`.
Base size is `font-size: 105%` on `<html>`; sizes are in rem, so changing that one value rescales the whole UI.

## Reusable pieces (copy these into components)
| Piece | Where |
|---|---|
| Shell: sidebar + top bar | the first ~150 lines of any page (`#sidebar`, `<header>`) |
| Card / KPI card | `.card`, `.kpi-foot` (see `index.html`) |
| Buttons, pills, avatars, fields, switch, segmented control, range | `@layer components` in `src/input.css` |
| Data table | `applications.html`, `leads.html` |
| Kanban board | `pipeline.html` |
| Month calendar grid | `calendar.html` |
| Charts (bars, gauge, donut, area, heatmap) | inline SVG / CSS in `index.html`, `analytics.html` |
| Icons | one inline `<svg>` sprite at the top of each page, used as `<svg class="i"><use href="#i-name"/></svg>` — replace with Lucide / Heroicons in your stack |

## The JavaScript (`src/app.js`)
Dark mode (+ "match system"), sidebar drawer/collapse, the profile menu, settings tabs, segmented-control highlight, range-slider fill. That's all.
In Vue/React replace each block with a few lines of state (`isDark`, `sidebarOpen`, `activeTab`).

## Not included — add per project
The pages ship with sample data and no behaviour beyond the above. Suggested libraries when you need it:

| Need | Library |
|---|---|
| Sorting / filtering / pagination of tables | server-side (Laravel, Inertia) or Tabulator / TanStack Table |
| Drag & drop kanban, drag events | SortableJS |
| Live charts (instead of static SVG) | ApexCharts or Chart.js |
| Calendar logic | FullCalendar (or build from `calendar.html`) |
| Dropdowns, modals, tabs without writing JS | Alpine.js, Headless UI (React/Vue) |
| Date pickers | Flatpickr |
