import { FunctionalComponent, JSX } from 'preact';
import style from './styles.module.css';

type Props = JSX.HTMLAttributes & {
	class?: string;
	component?: any;
};

export const Flow: FunctionalComponent<Props> = ({
	children,
	class: className = '',
	component: Component = 'div',
	...props
}) => {
	return (
		<Component class={`${style.flow} ${className}`} {...props}>
			{children}
		</Component>
	);
};
