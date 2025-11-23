import {Poppins} from 'next/font/google';

export const poppins = Poppins({
	weight: ['400', '700', '900'],
	subsets: ['latin'],
	variable: '--poppins',
});

export const FontVariables = [poppins.variable].join(' ').trim();
