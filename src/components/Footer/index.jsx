import styles from './styles.module.css';

export const Footer = () => {
	const yearStart = '2022';
	const yearEnd = new Date().getFullYear().toString();
	const yearRange =
		yearStart !== yearEnd ? `${yearStart}-${yearEnd}` : yearStart;

	return <footer class={styles.footer}>© {yearRange} Tim Severien</footer>;
};
