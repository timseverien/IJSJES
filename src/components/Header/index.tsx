import { FunctionalComponent, JSX } from 'preact';
import ImageLogo from '../../assets/logo.svg';
import styles from './styles.module.css';

type Props = JSX.HTMLAttributes & {
	requestUrl: URL;
};

export const Header: FunctionalComponent<Props> = ({ requestUrl }) => {
	const links = [
		{ path: '/', text: 'Posts' },
		{ path: '/about', text: 'About' },
	];

	const { pathname } = requestUrl;

	return (
		<header class={styles.header}>
			<a href="/">
				<img
					src={ImageLogo}
					alt="IJsjes logo"
					height="96"
					width="222"
					class={styles.logo}
				/>
			</a>

			<nav>
				<ul class={styles.navigationList} role="list">
					{links.map((link) => (
						<li>
							<a href={link.path} data-state-active={pathname === link.path}>
								{link.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
