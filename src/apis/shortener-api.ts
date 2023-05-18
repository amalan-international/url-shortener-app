import axios, { AxiosError } from 'axios';

const post = async (endpoint: string, requestData: object | null) => {
	try {
		const { data, status } = await axios.post(
			`https://go.amalan.xyz/${endpoint}`,
			requestData ? requestData : {},
			{
				headers: { 'Content-Type': 'application/json' },
				auth: {
					username: 'public_user',
					password: 'SBkI211KY3xDO43ukzPbS6',
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
