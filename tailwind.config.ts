import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			drkblu: '#0000ff',
			lgtblu: '#3395ff',
			txtblu: '#73b9ff',
			lnkblu: '#60a5fa',
			lnkhvr: '#2563eb',
			drkred: '#ff0000',
			lgtred: '#ff8f8f',
			drkppl: '#8000ff',
			lgtppl: '#c175ff',
			drkgry: '#555555',
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
export default config;
