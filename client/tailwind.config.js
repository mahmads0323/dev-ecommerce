/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bunker: "#222831",
        lightBunker: "#31363F",
        customBlue: "#295259",
        lightBlue: "#76ABAE",
        lightWhite: "#EEEEEE"
      },
      animation: {
        mobileMenuAnimation: "mobileMenuAnimation 0.5s ease",
      },
      keyframes: {
        mobileMenuAnimation: {
          "0%":{
            right: "-100%"
          },
          "100%":{
            right: "0%"
          }
        },
      },
      // backgroundImage: {
      //   heroSection : "url('/hero.jpg')"
      // }
    },
  },
  plugins: [],
}

