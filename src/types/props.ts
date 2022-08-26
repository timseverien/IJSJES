import { FunctionalComponent } from 'preact';
import { JSX } from 'preact/jsx-runtime';

export type ElementOrComponent =
	| keyof JSX.IntrinsicElements
	| FunctionalComponent;
