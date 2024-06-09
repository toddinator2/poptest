/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			black: '#000000',
			white: '#ffffff',
			drkblu: '#0000ff',
			lgtblu: '#3395ff',
			txtblu: '#73b9ff',
			drkred: '#ff0000',
			lgtred: '#ff8f8f',
			drkppl: '#8000ff',
			lgtppl: '#c175ff',
			drkgry: '#555555',
			txtclr: '#cacad9',
			menubg: '#0f1416',
			drkwht: '#adb5bd',
			lgtwht: '#dee2e6',
			txtbox: '#222222',
			drkbrd: '#1e272c',
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal',
			square: 'square',
			roman: 'upper-roman',
		},
	},
	plugins: [],
};
