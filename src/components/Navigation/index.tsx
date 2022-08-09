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
				{items.map((link) => (
					<li class={styles.navigationListItem}>
						<a
							href={link.path}
							data-state-active={pathname === link.path}
							class={styles.navigationLink}
						>
							{link.text}
						</a>
					</li>
				))}

				<li class={styles.navigationListItemEnd}>
					<a href="/rss.xml">
						<Icon path="/images/icons/rss.svg" alt="RSS" />
					</a>
				</li>
			</ul>
		</nav>
	);
};
