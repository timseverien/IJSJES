import { FunctionalComponent, JSX } from 'preact';
import style from './styles.module.css';

type Props = JSX.HTMLAttributes & {
	class?: string;
	component: string | ((props: JSX.HTMLAttributes) => JSX.Element);
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
