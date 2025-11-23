import {z} from 'zod';

export const formSchema = z.object({
	fullName: z.string().min(3, {message: 'Unesite validno ime i prezime'}),
	phoneNumber: z.string().min(5, {message: 'Unešen broj telefona nije validan'}),
	address: z.string().min(2, {message: 'Unešena adresa nije validna'}),
	city: z.string().min(2, {message: 'Unešen grad nije validan'}),
	price: z.string().min(1, {message: 'Unešena cena nije validna'}),
	zipCode: z.string().min(5, {message: 'Unešen poštanski broj nije validan'}),
	email: z.string().min(0, {message: 'Unešen email nije validan'}),
	companyName: z.string().optional(), // Anti-bot field - validation happens server-side
	// upSell: z.boolean().optional(),
	// shippingPrice: z.string(),
});
