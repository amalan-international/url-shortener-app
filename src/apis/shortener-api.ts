import axios, { AxiosError } from 'axios';
import { env } from '$env/dynamic/private';

const API_CONFIG = {
	BASE_URL: env.URL_SHORTENER_BASE_URL ?? '',
	USERNAME: env.URL_SHORTENER_USERNAME ?? '',
	PASSWORD: env.URL_SHORTENER_PASSWORD ?? '',
};

const post = async (endpoint: string, requestData: object | null) => {
	try {
		const { data, status } = await axios.post(
			`${API_CONFIG.BASE_URL}/${endpoint}`,
			requestData ? requestData : {},
			{
				headers: { 'Content-Type': 'application/json' },
				auth: {
					username: API_CONFIG.USERNAME,
					password: API_CONFIG.PASSWORD,
				},
			},
		);

		return { data, status };
	} catch (error: Error | AxiosError | any) {
		throw new Error(JSON.stringify(error));
	}
};

export default {
	post,
};
