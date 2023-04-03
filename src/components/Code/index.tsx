import { nanoid } from 'nanoid';
import { FunctionalComponent, createRef } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './styles.module.css';

export const CodeFile: FunctionalComponent<{ filename?: string }> = ({
	children,
	filename,
}) => {
	const id = `codefilename-${nanoid()}`;

	return (
		<div class={styles.codeFilenameContainer}>
			{filename && (
				<div id={id} class={styles.codeFilename}>
					{filename}
				</div>
			)}
			<div class={styles.codeFilenameCode} aria-describedby={id}>
				{children}
			</div>
		</div>
	);
};

export const CodeFileGroup: FunctionalComponent<{
	filenames: string[];
}> = ({ children, filenames }) => {
	return (
		<div>
			<ul class={styles.codeFilenameList}>
				{filenames.map((filename) => (
					<li class={styles.codeFilename}>{filename}</li>
				))}
			</ul>
			<div>{children}</div>
		</div>
	);
};

export const CodeVariantList: FunctionalComponent<{
	variants: string[];
}> = ({ children, variants }) => {
	const [activeVariant, setActiveVariant] = useState(0);
	const codeContainer = createRef<HTMLDivElement>();

	useEffect(() => {
		if (!codeContainer.current) return;

		console.log(codeContainer.current);

		for (let i = 0; i < codeContainer.current.children.length; i++) {
			const child = codeContainer.current.children[i];

			i !== activeVariant
				? child.setAttribute('hidden', 'hidden')
				: child.removeAttribute('hidden');
		}
	}, [activeVariant, codeContainer]);

	return (
		<div>
			<ul>
				{variants.map((variant: string, index: number) => (
					<li>
						<button
							role="tab"
							aria-selected={activeVariant === index ? 'true' : 'false'}
							aria-controls="tabpanel-id"
							id="tab-id"
							onClick={() => setActiveVariant(index)}
						>
							{variant} {activeVariant === index && <>(active)</>}
						</button>
					</li>
				))}
			</ul>
			<div ref={codeContainer}>{children}</div>
		</div>
	);
};

export const CodeVersus: FunctionalComponent = ({ children }) => {
	return <div class={styles.codeVersus}>{children}</div>;
};
