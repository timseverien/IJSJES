import { FunctionalComponent } from 'preact';
import { Icon } from '@components/Icon';
import styles from './styles.module.css';

interface NavigationItem {
	path: string;
	text: string;
}

export const Navigation: FunctionalComponent<{
	items: NavigationItem[];
	requestUrl: URL;
}> = ({ items, requestUrl }) => {
	const { pathname } = requestUrl;

	return (
		<nav class={styles.navigation}>
			<ul class={styles.navigationList} role="list">
				{items.map((link, index) => (
					<li
						class={`${styles.navigationListItem} ${
							index === items.length - 1
								? styles.navigationListItemLastPage
								: null
						}`}
					>
						<a
							href={link.path}
							data-state-active={pathname === link.path}
							class={styles.navigationLink}
						>
							{link.text}
						</a>
					</li>
				))}

				{/* <li class={styles.navigationListItem}>
					<a href="https://mastodon.social/@ijsjes" rel="me">
						<Icon icon="mastodon" alt="IJSJES on Mastodon" />
					</a>
				</li>
				<li class={styles.navigationListItem}>
					<a href="https://twitter.com/ijsjes_dev" rel="me">
						<Icon icon="twitter" alt="IJSJES on Twitter" />
					</a>
				</li> */}
				<li class={styles.navigationListItem}>
					<a href="/rss.xml">
						<Icon icon="rss" alt="RSS" />
					</a>
				</li>
			</ul>
		</nav>
	);
};
