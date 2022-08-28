import { FunctionalComponent } from 'preact';
import styles from './styles.module.css';

interface IconProps {
	icon: string;
	alt: string;
}

export const Icon: FunctionalComponent<IconProps> = ({ alt, icon }) => {
	return (
		<img alt={alt} src={`/images/icons/${icon}.svg`} class={styles.icon} />
	);
};
