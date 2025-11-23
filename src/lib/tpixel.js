export const TT_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export const pageview = () => {
	if (typeof window !== 'undefined' && window.ttq) {
		window.ttq.page();
	}
};

export const event = (name, options = {}) => {
	if (typeof window !== 'undefined' && window.ttq) {
		window.ttq.track(name, options);
	}
}; 