import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { Post } from './posts';

type PostSearchDataPost = {
	title: string;
	url: string;
};

export type PostSearchData = {
	data: string[];
	post: PostSearchDataPost;
}[];

export type PostSearchResult = PostSearchDataPost[];

function getQueryFromUrl() {
	return typeof window !== 'undefined'
		? new URL(window.location.href).searchParams.get('s')
		: '';
}

export function getSearchDataFromPostList(posts: Post[]): PostSearchData {
	return posts.map((p) => ({
		data: [p.frontmatter.title],
		post: {
			title: p.frontmatter.title,
			url: p.url,
		},
	}));
}

export function usePostSearch(
	data: PostSearchData,
): [string, PostSearchDataPost[], StateUpdater<string>] {
	const [query, setQuery] = useState(getQueryFromUrl() || '');
	const [results, setResults] = useState<PostSearchDataPost[]>([]);

	useEffect(() => {
		if (query.length === 0) {
			setResults(data.map((d) => d.post));
			return;
		}

		const resultsNew: { result: PostSearchDataPost; score: number }[] = [];

		for (const dl of data) {
			const result = {
				score: 0,
				result: dl.post,
			};

			for (const [priority, d] of dl.data.entries()) {
				console.log({ d, query });

				if (d && d.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
					result.score += 1 + priority;
				}
			}

			resultsNew.push(result);
		}

		setResults(
			resultsNew
				.filter((r) => r.score > 0)
				.sort((a, b) => a.score - b.score)
				.map((r) => r.result),
		);

		console.log(resultsNew);
	}, [data, query]);

	return [query, results, setQuery];
}
