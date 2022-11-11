import { FunctionalComponent } from 'preact';
import styles from './styles.module.css';

type IconSize = 's' | 'm';

interface IconProps {
	icon: string;
	alt: string;
	size?: IconSize;
}

const classNames: Map<IconSize, string> = new Map([
	['s' as const, styles.iconSmall],
	['m' as const, styles.iconSmall],
]);

export const Icon: FunctionalComponent<IconProps> = ({
	alt,
	icon,
	size = 'm',
}) => (
	<img
		alt={alt}
		src={`/images/icons/${icon}.svg`}
		class={`${styles.icon} ${classNames.get(size)}`}
	/>
);
