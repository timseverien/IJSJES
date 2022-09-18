import { FunctionalComponent, JSX } from 'preact';
import styles from './styles.module.css';

export const Button: FunctionalComponent<
	JSX.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
	<button class={styles.button} {...props}>
		{children}
	</button>
);
