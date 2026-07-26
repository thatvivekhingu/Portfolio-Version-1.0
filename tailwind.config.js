module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Include all files in the app directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include all files in the components directory
    "./node_modules/@magicui/**/*.{js,ts,jsx,tsx}", // Required for magicui
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        script: ["var(--font-script)", "ui-rounded", "cursive"],
      },
      animation: {
        meteor: "meteor 6s cubic-bezier(0.20, 0.1, 0.30, 1) infinite",
        "shimmer-slide":
        "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "button-shine": "button-shine var(--speed) ease-in-out infinite",
        "spin-grow": "spin-grow 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        wiggle: "wiggle 0.8s ease-out 1",
        "sound-wave": "sound-wave ease-in-out infinite alternate",
        "border-beam": "border-beam calc(var(--duration)) infinite linear",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "button-shine": {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "30%, 100%": { transform: "translateX(350%) skewX(-20deg)" },
        },
        meteor: {
          "0%": {
            transform: "rotate(var(--angle)) translateX(0)",
            opacity: "0.1",
          },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(var(--angle)) translateX(-500px)",
            opacity: "0.1",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        wiggle: {
          "0%": { transform: "rotate(-15deg)" },
          "20%": { transform: "rotate(15deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "60%": { transform: "rotate(10deg)" },
          "80%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" }, 
        },
        "spin-grow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "sound-wave": {
          "0%": {
            transform: "scaleY(0.3)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
