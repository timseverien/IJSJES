import { FunctionalComponent } from 'preact';
import styles from './styles.module.css';

interface IconProps {
	path: string;
	alt: string;
}

export const Icon: FunctionalComponent<IconProps> = ({ alt, path }) => {
	return <img alt={alt} src={path} class={styles.icon} />;
};
