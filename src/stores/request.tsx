let request = null;

export const getRequest = (): URL => request;

export const setRequest = (url: string): void => {
	request = new URL(url);
};
