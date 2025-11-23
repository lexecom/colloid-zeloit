export const APP_NAME = 'Noro Srbija';
export const APP_DESCRIPTION = 'Noro Trakice za Nos za Lakše Disanje';
export const APP_URL = 'noro.rs';

/**  ---- Max Ljudi na Sajtu ---- */
export const MAX_PEOPLE_WATCHING = 57;

/**  ---- Cene ---- */
export const PRODUCT_NAME = 'Noro Trakice za Nos';
export const CURRENCY = 'RSD';
export const DOSTAVA = '280';
// Price configuration with quantity, shipping, savings, and description mapping
export const PRICE_CONFIG: Record<string, { 
	quantity: number; 
	topomsQuantity?: number;
	shipping: number; 
	noDiscountPrice: number; 
	description: string;
}> = {
	'1890': { quantity: 1, shipping: 280, noDiscountPrice: 2000, description: 'Dostava +280 RSD' },
	'3290': { quantity: 2, shipping: 0, noDiscountPrice: 4000, description: 'BESPLATNA DOSTAVA' },
	'3990': { quantity: 3, topomsQuantity: 4, shipping: 0, noDiscountPrice: 6000, description: 'BESPLATNA DOSTAVA' }
};

// Dynamic arrays derived from PRICE_CONFIG
export const PRICES = Object.keys(PRICE_CONFIG);  // ['1890', '3290', '3990']
export const PRICES_NO_DISCOUNT = Object.values(PRICE_CONFIG).map(config => config.noDiscountPrice.toString()); // ['2000', '4000', '6000']

// Price per piece is calculated dynamically: totalPrice / quantity
// No need for hardcoded PCS array anymore
export const UPSELL_NAME = 'DOPLATA';
export const UPSELL_NASLOV = 'Poklon Proizvod (vrednost 2000rsd)';
export const UPSELL_PRICE = '400';
// export const SHIPPING_PRICE = ['Zlatna Mašinica', 'Crna Mašinica'];

// Site configuration for multi-subdomain deployment
export const SITE_CONFIG = {
	showCouponField: true,  // Set to false to hide coupon code input field
};

// Coupon configuration - supports both fixed amounts (number) and percentages (string with '%')
// Fixed amount example: 'BOJKOVIC': 100 (100 RSD discount)
// Percentage example: 'DISCOUNT10': '10%' (10% discount)
export const COUPON_CODES: Record<string, number | string> = {
	'BOJKOVIC': '10%',
	'CLUB10': 250,
	'FANDF': '25%',
	'HVALA350': 350,
	'IVV10': 200,
	'STEFANOVPECAT': 200,
	'GLADOVIC': 200,
	'MP11': 200,
	'MILANBT': '10%',
	'NOLEX':'10%',
	'GILEBJJ':'10%',
	'JOKER':'10%',
	'CVETA':'10%',
	'DUSANMMA':'10%',
};

// Legacy constants (kept for backward compatibility)
export const COUPON_CODE = 'BOJKOVIC';
export const COUPON_DISCOUNT = '100';

// Notify Sekcija
export const NOTIFY_PRVI = 'NAUČNO DOKAZANO';
export const NOTIFY_DRUGI = '#1 PO KVALITETU';

// Hero Sekcija
export const HERO_TITLE = 'Prodiši za Sekund - do 80% Više Kiseonika uz Noro Trakice za Nos';
export const HERO_DESCRIPTION =
	'Mali pokret – velika razlika u disanju. Uz Noro nema više zapušenog nosa, hrkanja i pospanosti. Ne vidi se i ne oseća na koži, ne izaziva iritacije. Jedino prirodno, instant olakšanje za disanje.';
export const HERO_BUTTON = 'POGLEDAJ PONUDU I PRODIŠI';
export const HERO_ICONS = ['Garancija 30 Dana', 'Plaćanje Pouzećem', '7,000+ Kupaca'];

// Benefiti Sekcija
export const LOOK_AT_PRODUCT_TITLE = 'UMORNI STE OD NISKOG PRITISKA I SLABOG PROTOKA VODE?';
export const LOOK_AT_PRODUCT_BUTTON = 'Poruči Šampon na Popustu';
export const LOOK_AT_PRODUCT_PRVI_NASLOV = '👉 UŠTEDI NOVAC BEZ MAJSTORA';
export const LOOK_AT_PRODUCT_PRVI_TEKST = 'Povratite sjaj farovima sami, bez majstora i nepotrebnog troška.';

export const LOOK_AT_PRODUCT_DRUGI_NASLOV = '👉 KAKO RADI?';

export const LOOK_AT_PRODUCT_DRUGI_TEKST =
	'Dovoljno je poprskati sprej, ostaviti ga 5 minuta i postigli ste željeni efekat.';
export const LOOK_AT_PRODUCT_DRUGI_TEKST_2 =
	'Glava tuša se takođe rotira za 360 stepeni, omogućavajući vam da uživate u svestranim iskustvima kupanja.';

export const LOOK_AT_PRODUCT_TRECI_NASLOV = '👉 BEZBEDAN? Tehniči Pregled?';
export const LOOK_AT_PRODUCT_TRECI_TEKST = '';

export const LOOK_AT_PRODUCT_CETVRTI_NASLOV = '👉 LAKO MONTIRANJE';
export const LOOK_AT_PRODUCT_CETVRTI_TEKST =
	'Sigurno već znate da morate da operete bar 2 krpe nakon svakog brisanja prašine i potrošite brdo hemije. Sa Mini Mop-om ćete zaboraviti na magične krpe i hemiju, jer sa malo vode i jednim prelaskom učinićete da svaka površina zablista.';

// export const LOOK_AT_PRODUCT_PETI_NASLOV = '👉 Ocedite ga za sekund';
// export const LOOK_AT_PRODUCT_PETI_TEKST =
// 	'Jedna od najvećih prednosti Mini Mop-a je da ga možete skroz ocediti samo jednim potezom, što znači da nema mukotrpnog ceđenja rukama i viška tečnosti koja ide na sve strane.';

// Preko X Zadovoljnih Kupaca
export const TRUST_NASLOV_ZADOVOLJNI_KUPCI = '7,000+ Zadovoljnih Ljudi';

// Prednosti Ukratko
export const CONSEQUENCES_TITLE = 'Koje su to Prednosti?';
export const CONSEQUENCES_LIST = [
	'Prirodno Rešenje',
	'Veća Izdržljivost i Performanse',
	'Lako se Koriste',
	'Ne Izazivaju Iritaciju',
	'Eleminišu Hrkanje',
	'Veći Fokus i Koncentracija',
	'BreatheSkin™ Materijal',
];
export const CONSEQUENCES_CONCLUSION = 'Noro - Broj 1 po Kvalitetu';
export const CONSEQUENCES_BUTTON = 'Isprobaj ODMAH i Konačno Prodiši';

// Komentari Kupaca
export const KOMENTARI_KUPACA = 'Evo šta kaže jedan od kupaca';

// // Forma
// export const FORMA_PRVI = 'Poruči danas i Uštedi 70%';
// export const FORMA_DRUGI = 'Poklon uz Svaku 5. Narudžbu';

// FAQs
export const FAQ_NULA = '30dana Garancija na Povrat Novca?';
export const FAQ_NULA_ODGOVOR =
	'Ukoliko niste zadovoljni sa Noro trakicama u prvih 30 dana možete vratiti i zatražiti svoj novac nazad. Sve što je potrebno je da nam se javite na email i popunite formu za vraćanje novca.';
export const FAQ_PRVI = 'Da li ostaje trajan trag na nosu?';
export const FAQ_PRVI_ODGOVOR =
	'Ne! Noro trakice su hipoalergenski i blage za kožu i neće ostaviti nikakve trajne posledice na nosu.';
export const FAQ_DRUGI = 'Šta ako mi stigne oštećen?';
export const FAQ_DRUGI_ODGOVOR =
	'Ukoliko se desi da Vam je stigla neispravan proizvod ili oštećen sve što je potrebno jeste da nas kontaktirate i mi Vam šaljemo novi paket.';

export const FAQ_TRECI = 'Kako se vrši plaćanje?';
export const FAQ_TRECI_ODGOVOR = 'Plaćanje pouzećem tj. plaćanje kuriru prilikom preuzimanja paketa.';
export const FAQ_CETVRTI = 'Kada će mi stići paket?';
export const FAQ_CERTVRTI_ODGOVOR = 'Paket dobijate u roku od 1-2 radna dana.';
