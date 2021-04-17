const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			...colors,
		},
		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
			serif: ['Roboto Slab', 'serif'],
			mono: ['Roboto Mono', 'mono'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
