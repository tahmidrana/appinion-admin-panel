/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        float: 'var(--float)',
        well: 'var(--well)',
        line: 'var(--line)',
        line2: 'var(--line-2)',
        fg: 'var(--text)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        ink: 'var(--ink)',
        'on-ink': 'var(--on-ink)',
        side: 'var(--side-bg)',
        'side-fg': 'rgb(239 233 225 / <alpha-value>)',
        ember: { DEFAULT: 'var(--ember)', t: 'var(--ember-t)', soft: 'var(--ember-soft)' },
        iris: { DEFAULT: 'var(--iris)', t: 'var(--iris-t)', soft: 'var(--iris-soft)' },
        spruce: { DEFAULT: 'var(--spruce)', t: 'var(--spruce-t)', soft: 'var(--spruce-soft)' },
        saffron: { DEFAULT: 'var(--saffron)', t: 'var(--saffron-t)', soft: 'var(--saffron-soft)' },
      },
      boxShadow: {
        card: 'var(--shadow)',
        lift: 'var(--shadow-lift)',
        pop: 'var(--shadow-pop)',
        ember: '0 10px 24px -12px rgb(225 90 51 / .7), inset 0 1px 0 rgb(255 255 255 / .25)',
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.25rem' },
    },
  },
  plugins: [],
};
