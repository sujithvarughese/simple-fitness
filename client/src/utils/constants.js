const prod = {
	url: {
		API_URL: "https://simpler-fitness-api-2f86e824ee20.herokuapp.com/api/v1"
	}
};

const dev = {
	url: {
		API_URL: import.meta.env.VITE_DEV_API
	}
};

export const config =
	process.env.NODE_ENV === "development" ? dev : prod;