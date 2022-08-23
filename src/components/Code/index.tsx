import { nanoid } from 'nanoid';
import { FunctionalComponent } from 'preact';
import styles from './styles.module.css';

export const CodeFile: FunctionalComponent<{ filename?: string }> = ({
	children,
	filename,
}) => {
	const id = `codefilename-${nanoid()}`;

	return (
		<div>
			{filename && (
				<div id={id} class={styles.codeFilename}>
					{filename}
				</div>
			)}
			<div aria-describedby={id}>{children}</div>
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
