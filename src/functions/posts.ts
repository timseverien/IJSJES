export interface Post {
	url: string;

	frontmatter: {
		description: string;
		draft: boolean;
		pubDate: Date;
		title: string;
	};
}

export const loadPosts = async () => {
	const files = import.meta.glob<Post>('../pages/posts/*.md');
	const postsUnsorted = await Promise.all(Object.values(files).map((f) => f()));

	return postsUnsorted
		.filter((p) => !p.frontmatter.draft)
		.sort((a, b) => {
			const aDate = new Date(a.frontmatter.pubDate);
			const bDate = new Date(b.frontmatter.pubDate);

			return aDate > bDate ? -1 : 1;
		});
};

export const getImageAbsoluteUrl = (
	astroSiteUrl: URL,
	imagePath: string,
): URL => {
	const url = new URL(astroSiteUrl);

	url.pathname = imagePath;

	return url;
};
