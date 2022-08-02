import { FunctionalComponent, JSX } from 'preact';
import styles from './styles.module.css';

type Props = JSX.HTMLAttributes & {
	class?: string;
	component: string | ((props: JSX.HTMLAttributes) => JSX.Element);
};

export const ContentBlock: FunctionalComponent<Props> = ({
	children,
	class: className = '',
	component: Component = 'div',
	...props
}) => {
	return (
		<Component class={`${styles.contentBlock} ${className}`} {...props}>
			{children}
		</Component>
	);
};
