import { FunctionalComponent } from 'preact';
import { Post } from '@functions/posts';
import { HeadingLevel, HeadingTag } from 'src/types/Heading';
import styles from './styles.module.css';

export const PostList: FunctionalComponent<{
	posts: Post[];
	headingLevel?: HeadingLevel;
}> = ({ posts, headingLevel = 2 }) => {
	const Heading = ('h' + headingLevel) as HeadingTag;

	return (
		<ul class={styles.postList}>
			{posts.map((p) => (
				<li>
					<article>
						<a href={p.url}>
							<Heading>{p.frontmatter.title}</Heading>
						</a>
					</article>
				</li>
			))}
		</ul>
	);
};
