import { FunctionalComponent } from 'preact';
import { Post } from '@functions/posts';
import styles from './styles.module.css';

export const PostList: FunctionalComponent<{ posts: Post[] }> = ({ posts }) => (
	<ul class={styles.postList}>
		{posts.map((p) => (
			<li>
				<article>
					<a href={p.url}>
						<h2>{p.frontmatter.title}</h2>
					</a>
				</article>
			</li>
		))}
	</ul>
);
