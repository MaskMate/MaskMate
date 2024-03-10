import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        text: "#04020d",
                        background: "#f6f6f6",
                        primary: "#7238f0",
                        secondary: "#d6e2ff",
                        accent: "#f03d52",
                    },
                },
            },
        }),
    ],
};
