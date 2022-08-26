import { FunctionalComponent, JSX } from 'preact';
import { ElementOrComponent } from 'src/types/props';
import styles from './styles.module.css';

export const VisuallyHidden: FunctionalComponent<{
	component: ElementOrComponent;
}> = ({ children, component: Component = 'div' }) => (
	<Component class={styles.visuallyHidden}>{children}</Component>
);
