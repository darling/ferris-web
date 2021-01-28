const colors = require('tailwindcss/colors');

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			green: colors.green,
			red: colors.red,
			gray: colors.trueGray,
			yellow: colors.amber,
			white: colors.white,
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
