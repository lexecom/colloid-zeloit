import crypto from 'crypto';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type {CredentialBody, ExternalAccountClientOptions} from 'google-auth-library';
import {google} from 'googleapis';
import {type NextApiRequest, type NextApiResponse} from 'next';

import {PRICE_CONFIG, UPSELL_PRICE} from '@/lib/constants';
import logger from '@/lib/utils/logger';

// Configure dayjs with timezone support
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Belgrade'); // Set default timezone to Belgrade

/**
 * Google Sheets Columns Layout:
 * A-S: Original order data (ID, Date, Name, Phone, etc.)
 * T: Webhook Status (SUCCESS/FAILED)
 * U: Webhook Message (success message or error details)
 * V: Webhook Response (full JSON response from webhook)
 */

// TopOMS Webhook configuration
const TOPOMS_CONFIG = {
	url: process.env.TOPOMS_WEBHOOK_URL || '',
	shopDomain: process.env.TOPOMS_SHOP_DOMAIN || '', // Hardcode your domain here
	authMethod: process.env.TOPOMS_AUTH_METHOD || 'signature', // 'api-key' or 'signature'
	apiKey: process.env.TOPOMS_API_KEY || '', // Only used if authMethod is 'api-key'
	webhookSecret: process.env.TOPOMS_WEBHOOK_SECRET || '',
};

// N8N Webhook configuration
const N8N_CONFIG = {
	url: process.env.N8N_WEBHOOK_URL || '',
	spamProtectionUrl: process.env.N8N_WEBHOOK_SPAM_PROTECTION_URL || '',
};

// Function to get current domain from request
function getCurrentDomain(req: NextApiRequest): string {
	// First priority: environment variable (if set, always use it)
	if (TOPOMS_CONFIG.shopDomain) {
		return TOPOMS_CONFIG.shopDomain;
	}

	// Second priority: get from request headers (dynamic detection)
	const host = req.headers.host;
	if (host) {
		return host;
	}

	// Fallback: hardcoded domain (replace with your domain or keep localhost)
	return process.env.TOPOMS_SHOP_DOMAIN || 'localhost';
}

async function sendToTopOMS(orderData: any, currentDomain: string) {
	// Skip if webhook URL is not configured
	if (!TOPOMS_CONFIG.url) {
		logger.log('TopOMS webhook URL not configured, skipping...');
		return null;
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		'X-Shop-Domain': currentDomain, // Use dynamic domain
		'X-Auth-Method': TOPOMS_CONFIG.authMethod
	};

	// Prepare a payload specifically for TopOMS that ensures required fields are populated
	// Do not mutate the original orderData to keep other webhooks (Google/N8N) unchanged
	const payload = {
		...orderData,
		customer: {
			...orderData?.customer,
			email: orderData?.customer?.email || `${orderData?.customer?.phone}@temp.com`
		}
	};

	if (TOPOMS_CONFIG.authMethod === 'signature' && TOPOMS_CONFIG.webhookSecret) {
		// Create HMAC signature
		const timestamp = Math.floor(Date.now() / 1000);
		const signatureData = `${timestamp}.${JSON.stringify(payload)}`;
		const signature = crypto
			.createHmac('sha256', TOPOMS_CONFIG.webhookSecret)
			.update(signatureData)
			.digest('hex');

		headers['X-Webhook-Signature'] = signature;
		headers['X-Webhook-Timestamp'] = timestamp.toString();
	} else {
		// Use API key
		headers['X-API-Key'] = TOPOMS_CONFIG.apiKey;
	}

	const response = await fetch(TOPOMS_CONFIG.url, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload)
	});
	const result = await response.json();
	if (!response.ok) {
		throw new Error(result.error || `TopOMS webhook failed with status ${response.status}`);
	}
	return result;
}

async function sendToN8N(orderData: any) {
	// Skip if webhook URL is not configured
	if (!N8N_CONFIG.url) {
		logger.log('N8N webhook URL not configured, skipping...');
		return null;
	}

	const n8nBody = { ...orderData, source: 'RS' };
	const response = await fetch(N8N_CONFIG.url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(n8nBody)
	});
	const result = await response.json();
	if (!response.ok) {
		throw new Error(result.error || `N8N webhook failed with status ${response.status}`);
	}
	return result;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		// Get current domain early in the handler
		const currentDomain = getCurrentDomain(req);

		const body = req.body;
	
		logger.log('📥 API received body:', body);
		logger.log('🌐 Order domain:', currentDomain);
		logger.log('🎯 Marketing params received:', {
			medium: body.medium,
			campaign_id: body.campaign_id,
			adset_id: body.adset_id,
			ad_id: body.ad_id,
			aff_id: body.aff_id
		});
	
		// Convert price index to number and validate
		const priceIndex = Number(body.price);
	const priceKeys = Object.keys(PRICE_CONFIG);
	if (isNaN(priceIndex) || priceIndex < 0 || priceIndex >= priceKeys.length) {
		console.error('Invalid price index received:', body.price);
		return res.status(400).json({
			message: `Invalid price index: ${body.price}. Must be 0, 1, or 2`
		});
	}
	
	// Get configuration from PRICE_CONFIG (100% reliable)
	const actualPrice = priceKeys[priceIndex]!;
	const config = PRICE_CONFIG[actualPrice]!;
	const { quantity, topomsQuantity, shipping: shippingCost, noDiscountPrice } = config;
		
		// Use the calculated discount from frontend (supports both fixed and percentage discounts)
		const discount = body.couponDiscount ? Number(body.couponDiscount) : 0;
		const totalPrice = Number(actualPrice) + (body.upSell ? Number(UPSELL_PRICE) : 0) - discount;
		const totalPriceWithShipping = totalPrice + shippingCost;

				const pricePerUnit = totalPrice / quantity;
	const postarina = `'${shippingCost.toFixed(2)}`;  // Dynamic shipping cost from config
	
	// Calculate real customer savings: what customer would pay vs what they actually pay
	const actualPriceNum = Number(actualPrice);
	const customerActualTotal = actualPriceNum + shippingCost; // What customer actually pays
	const customerWouldPayTotal = noDiscountPrice + shippingCost; // What customer would pay at no-discount price
	const usteda = customerWouldPayTotal - customerActualTotal; // Real savings
	
	logger.log('💰 Real savings calculation:', {
		noDiscountPrice,
		actualPrice: actualPriceNum,
		shippingCost,
		customerWouldPay: customerWouldPayTotal,
		customerActuallyPays: customerActualTotal,
		realSavings: usteda,
		quantity: quantity
	});

		// Generate unique order ID
		const orderId = `WEB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

		// Combine all marketing parameters into one JSON string
		const marketingData = JSON.stringify({
			medium: body.medium || '',
			campaign_id: body.campaign_id || '',
			adset_id: body.adset_id || '',
			ad_id: body.ad_id || '',
			aff_id: body.aff_id || ''
		});

		// Get the full site URL
		const protocol = req.headers['x-forwarded-proto'] || 'https';
		const siteUrl = `${protocol}://${currentDomain}`;

		const requiredFields = [
			orderId, // Using generated order ID instead of 'id'
			`${dayjs().tz('Europe/Belgrade').format('DD/MM/YYYY HH:mm:ss')}`, // Datum
			body.fullName, // Ime
			"'" + body.phoneNumber, // Broj
			body.address, // Adresa
			body.city, // Mesto
			body.zipCode, // ZipCode
			body.email, // Email
			totalPriceWithShipping,// Ukupna Cena (sa popustom)
			pricePerUnit,   // Cena po komadu
			usteda, // Usteda
			postarina, // Cena Postarine
			`${quantity}`,// Kolicina (pcs)
			`${'Noro Trakice za Nos'}`, //Proizvod
			"'0001", //SKU
			body.couponCode || '', // Kupon kod
			discount, // Iznos popusta
			marketingData, // Marketing data (JSON)
			siteUrl, // Site URL with protocol
		];

		// Prepare TopOMS webhook data
		const topomsOrderData = {
			order_id: orderId,
			created_at: dayjs().tz('Europe/Belgrade').toISOString(),
			currency: 'RSD',
			total_price: totalPriceWithShipping,
			financial_status: 'pending',
			customer: {
				email: body.email,
				phone: body.phoneNumber,
				note: body.customerNote || ''
			},
			billing_address: {
				name: body.fullName,
				address1: body.address,
				address2: '',
				city: body.city,
				zip: body.zipCode || '',
				country_code: 'RS',
				phone: body.phoneNumber
			},
			shipping_address: {
				name: body.fullName,
				address1: body.address,
				address2: '',
				city: body.city,
				zip: body.zipCode || '',
				country_code: 'RS',
				phone: body.phoneNumber
			},
			line_items: [
				{
					sku: '0001', // Your SKU without the quote
					name: 'Noro Trakice za Nos',
					quantity: topomsQuantity ?? quantity,
					price: totalPrice / (topomsQuantity ?? quantity),
					discount: 0,
				}
			],
			shipping: {
				price: shippingCost,
				method: shippingCost > 0 ? 'Standardna dostava' : 'Besplatna dostava'
			},
			discount_codes: body.couponCode ? [body.couponCode] : [],
			marketing: {
				campaign_id: body.campaign_id || null,
				adset_id: body.adset_id || null,
				ad_id: body.ad_id || null,
				aff_id: body.aff_id || null,
				medium: body.medium || 'website'
			}
		};

		// Add upsell item if selected
		if (body.upSell) {
			topomsOrderData.line_items.push({
				sku: 'UPSELL-SKU', // Replace with your actual upsell SKU
				name: 'Dodatni proizvod', // Replace with actual upsell product name
				quantity: 1,
				price: Number(UPSELL_PRICE),
				discount: 0
			});
		}

		const credentials: CredentialBody | ExternalAccountClientOptions | undefined = {
			client_email: process.env.GOOGLE_CLIENT_EMAIL ?? undefined,
			private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? undefined,
		} as CredentialBody | ExternalAccountClientOptions;
		try {
			// STEP 1: Send to webhooks FIRST and get status
			let webhookStatus = 'FAILED';
			let webhookMessage = '';
			let topomsResult = null;
			
			try {
				logger.log('🚀 Attempting to send to TopOMS webhook first...');
				topomsResult = await sendToTopOMS(topomsOrderData, currentDomain);
				webhookStatus = 'SUCCESS';
				webhookMessage = 'Webhook delivered successfully';
				logger.log('✅ TopOMS Webhook SUCCESS:', topomsResult);
			} catch (topomsError) {
				webhookStatus = 'FAILED';
				webhookMessage = topomsError instanceof Error ? topomsError.message : 'Unknown webhook error';
				logger.error('❌ TopOMS Webhook FAILED:', topomsError);
				// Continue to Google Sheets even if webhook fails
			}

			// STEP 1.5: Send to N8N webhook with the same body
			let n8nResult = null;
			try {
				logger.log('🚀 Attempting to send to N8N webhook...');
				n8nResult = await sendToN8N(topomsOrderData);
				logger.log('✅ N8N Webhook SUCCESS:', n8nResult);
			} catch (n8nError) {
				logger.error('❌ N8N Webhook FAILED:', n8nError);
				// Continue even if N8N webhook fails
			}

			// STEP 2: Add webhook status to the data that goes to Google Sheets
			const requiredFieldsWithWebhook = [
				...requiredFields,
				webhookStatus,     // Column T: Webhook Status (SUCCESS/FAILED)
				webhookMessage,    // Column U: Webhook Message/Error
				topomsResult ? JSON.stringify(topomsResult) : '', // Column V: Webhook Response (JSON)
			];

			// STEP 3: Send to Google Sheets with webhook status included
			const auth = new google.auth.GoogleAuth({
				credentials: credentials,
				scopes: [
					'https://www.googleapis.com/auth/drive',
					'https://www.googleapis.com/auth/drive.file',
					'https://www.googleapis.com/auth/spreadsheets',
				],
			});
			const sheets = google.sheets({
				auth,
				version: 'v4',
			});
			if (!process.env.GOOGLE_SHEET_ID) {
				throw new Error('GOOGLE_SHEET_ID is not defined in the environment variables');
			}
			await sheets.spreadsheets.values.append({
				spreadsheetId: process.env.GOOGLE_SHEET_ID,
				range: 'A:V', // Extended range: A-S (existing), T (webhook status), U (webhook message), V (webhook response)
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS',
				requestBody: {
					values: [requiredFieldsWithWebhook],
				},
			});

			logger.log('✅ Google Sheets updated with webhook status:', webhookStatus);

			return res.json({
				message: 'Success',
				orderId: orderId,
				webhookStatus: webhookStatus,
				webhookMessage: webhookMessage,
				topomsResult: topomsResult,
				n8nResult: n8nResult,
				domain: currentDomain // Optional: include domain in response for debugging
			});
		} catch (e: unknown) {
			if (e instanceof Error) {
				logger.critical('API submission failed', e);
				return res.json({message: e?.message});
			} else {
				logger.critical('Unknown API error', e);
				return res.json({message: 'Unknown error occurred'});
			}
		}
	}
}

export default handler;