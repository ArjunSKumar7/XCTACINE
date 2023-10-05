import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
],
  theme: {
    extend: {},
  },
  plugins: [],
});
