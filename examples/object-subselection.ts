export function entriesPick<T extends object>(
	object: T,
	properties: (keyof T)[],
) {
	return Object.fromEntries(
		Object.entries(object).filter(([prop]) =>
			properties.includes(prop as keyof T),
		),
	);
}

export function entriesOmit<T extends object>(
	object: T,
	properties: (keyof T)[],
) {
	return Object.fromEntries(
		Object.entries(object).filter(
			([prop]) => !properties.includes(prop as keyof T),
		),
	);
}

export function deletePick<T extends object>(
	object: T,
	properties: (keyof T)[],
) {
	const copy = { ...object };

	for (const prop in copy) {
		if (!properties.includes(prop)) {
			delete copy[prop];
		}
	}

	return copy;
}

export function deleteOmit<T extends object>(
	object: T,
	properties: (keyof T)[],
) {
	const copy = { ...object };

	for (const prop of properties) {
		delete copy[prop];
	}

	return copy;
}
