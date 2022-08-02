import { FunctionalComponent } from 'preact';
import styles from './styles.module.css';

export const VisuallyHidden: FunctionalComponent = ({ children }) => {
	return <div class={styles.visuallyHidden}>{children}</div>;
};
