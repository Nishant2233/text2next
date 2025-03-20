/** @type {import('tailwindcss').Config}  */
// import tailwindScrollbarHide from 'tailwind-scrollbar-hide'
export default {
    darkMode: "class", // Enables dark mode using the `.dark` class
    content: [
      "./pages/**/*.{js,jsx,ts,tsx,mdx}",
      "./components/**/*.{js,jsx,ts,tsx,mdx}",
      "./app/**/*.{js,jsx,ts,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
        },
        borderRadius: {
          sm: "calc(var(--radius) - 4px)",
          md: "calc(var(--radius) - 2px)",
          lg: "var(--radius)",
          xl: "calc(var(--radius) + 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate"),
      require('tailwind-scrollbar-hide')
    ],
  };
  