import { FunctionalComponent } from 'preact';
import { PostSearchData, usePostSearch } from '@functions/search';
import { Button } from '@components/Button';
import { PostSearchResultList } from '@components/PostList';
import styles from './styles.module.css';

export const PostSearch: FunctionalComponent<{
	data: PostSearchData;
}> = ({ data }) => {
	const [query, results, setQuery] = usePostSearch(data);

	return (
		<>
			<form method="get" class={styles.form}>
				<input
					type="search"
					name="s"
					class={styles.input}
					value={query}
					onChange={(e) => setQuery(e.currentTarget.value)}
					onInput={(e) => setQuery(e.currentTarget.value)}
					autocomplete="off"
				/>
				<Button type="submit">Search</Button>
			</form>

			{query.length > 0 &&
				(results.length > 0 ? (
					<PostSearchResultList posts={results} />
				) : (
					<>
						<p>Oops! No results</p>
					</>
				))}
		</>
	);
};
