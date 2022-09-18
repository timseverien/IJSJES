import slugify from 'slugify';

export interface Category {
	path: string;
	slug: string;
	title: string;
}

export interface Post {
	rawContent: string;
	url: string;

	frontmatter: {
		categories?: string[];
		description: string;
		draft: boolean;
		pubDate: Date;
		title: string;
	};
}

export const createCategorySlug = (category: string) =>
	slugify(category.toLocaleLowerCase());

export const createCategoryPath = (category: string) =>
	`/categories/${createCategorySlug(category)}`;

export const loadCategories = async () => {
	const posts = await loadPosts();

	return getCategoriesFromPostList(posts);
};

export const loadPosts = async () => {
	const files = {
		...import.meta.glob<Post>('../pages/posts/*.md'),
		...import.meta.glob<Post>('../pages/posts/*.mdx'),
	};

	const postsUnsorted = await Promise.all(Object.values(files).map((f) => f()));

	return postsUnsorted
		.filter((p) => !p.frontmatter.draft)
		.sort((a, b) => {
			const aDate = new Date(a.frontmatter.pubDate);
			const bDate = new Date(b.frontmatter.pubDate);

			return aDate > bDate ? -1 : 1;
		});
};

export const loadPostsByCategory = async (category: string) => {
	const posts = await loadPosts();

	return posts.filter(
		(p) =>
			Array.isArray(p.frontmatter?.categories) &&
			p.frontmatter.categories.includes(category),
	);
};

export const getCategoriesFromPostList = (postList: Post[]): Category[] => {
	const categories = new Map<string, Category>();

	for (const post of postList) {
		if (!Array.isArray(post.frontmatter.categories)) continue;

		for (const category of post.frontmatter.categories) {
			const slug = createCategorySlug(category);

			categories.set(slug, {
				path: createCategoryPath(category),
				slug,
				title: category,
			});
		}
	}

	return Array.from(categories.values()).sort((a, b) =>
		a.title.localeCompare(b.title),
	);
};

export const getImageAbsoluteUrl = (
	astroSiteUrl: URL,
	imagePath: string,
): URL => {
	const url = new URL(astroSiteUrl);

	url.pathname = imagePath;

	return url;
};
