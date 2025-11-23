/**
 * Coupon utility functions for handling both fixed and percentage discounts
 */

/**
 * Calculate discount amount based on coupon type
 * @param couponValue - The discount value (number for fixed, string with '%' for percentage)
 * @param basePrice - The base price to calculate percentage from
 * @returns The calculated discount amount
 */
export function calculateDiscount(
	couponValue: number | string,
	basePrice: number
): { amount: number; type: 'fixed' | 'percentage'; percentage?: number } {
	// Check if it's a percentage discount
	if (typeof couponValue === 'string' && couponValue.endsWith('%')) {
		const percentage = parseFloat(couponValue.replace('%', ''));
		const amount = Math.round((basePrice * percentage) / 100);
		
		return {
			amount,
			type: 'percentage',
			percentage,
		};
	}
	
	// Fixed amount discount
	return {
		amount: Number(couponValue),
		type: 'fixed',
	};
}

/**
 * Format coupon discount for display
 * @param couponCode - The coupon code
 * @param discount - The discount calculation result
 * @param currency - The currency symbol
 * @returns Formatted string for display
 */
export function formatCouponDisplay(
	couponCode: string,
	discount: ReturnType<typeof calculateDiscount>,
	currency: string
): string {
	if (discount.type === 'percentage') {
		return `Kupon kod "${couponCode}" primenjen! (${discount.percentage}% popusta - ${discount.amount} ${currency})`;
	}
	
	return `Kupon kod "${couponCode}" primenjen! (-${discount.amount} ${currency})`;
}

