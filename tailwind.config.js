const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		content: ['./components/**/*.*', './pages/**/*.*'],
	},
	darkMode: false,
	theme: {
		colors: {
			gray: colors.trueGray,
			green: colors.green,
			red: colors.red,
			white: colors.white,
		},
	},
	variants: {
		extend: {
			backgroundColor: ['checked', 'active'],
		},
	},
	plugins: [],
};
