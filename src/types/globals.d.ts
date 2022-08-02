declare global {
	const Astro: {
		props: object;
		request: {
			url: string;
		};
	};
}

export {};
