import { Navigation } from '@components/Navigation';
import { FunctionalComponent } from 'preact';
import ImageLogo from '../../assets/logo.svg';
import styles from './styles.module.css';

export const Header: FunctionalComponent<{ requestUrl: URL }> = ({
	requestUrl,
}) => {
	const links = [
		{ path: '/', text: 'Posts' },
		{ path: '/about', text: 'About' },
	];

	return (
		<header class={styles.header}>
			<a href="/">
				<img
					src={ImageLogo.src}
					alt="IJsjes logo"
					height="96"
					width="222"
					class={styles.logo}
				/>
			</a>

			<Navigation items={links} requestUrl={requestUrl} />
		</header>
	);
};
