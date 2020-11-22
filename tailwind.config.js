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
			blue: colors.blue,
			white: colors.white,
		},
	},
	variants: {},
	plugins: [],
};
