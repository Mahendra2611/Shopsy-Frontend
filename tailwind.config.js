/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enables dark mode using a CSS class
    theme: {
      extend: {
        colors: {
          background: {
            light: '#F9FAFB', 
            dark: '#1F2937'
          },
          heading: {
            light: '#111827',
            dark: '#F9FAFB'
          },
          subheading: {
            light: '#374151',
            dark: '#D1D5DB'
          },
          paragraph: {
            light: '#4B5563',
            dark: '#9CA3AF'
          }
        }
      }
    },
    plugins: [],
  };
  