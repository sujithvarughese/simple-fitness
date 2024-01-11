const prod = {
	url: {
		API_URL: import.meta.env.VITE_PROD_API
	}
};

const dev = {
	url: {
		API_URL: import.meta.env.VITE_DEV_API
	}
};

export const config =
	process.env.NODE_ENV === "development" ? dev : prod;