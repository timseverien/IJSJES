import rss from '@astrojs/rss';
import { loadPosts } from 'src/functions/posts';
import { DESCRIPTION, TITLE } from 'src/site';

export const get = async () => {
	const posts = await loadPosts();

	return rss({
		title: TITLE,
		description: DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts.map((p) => ({
			description: p.frontmatter.description,
			link: p.url,
			pubDate: p.frontmatter.pubDate,
			title: p.frontmatter.title,
		})),
	});
};
