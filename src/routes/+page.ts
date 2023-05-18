export type formActionApiResult = {
	status?: number | undefined;
	data?: {
		message: string;
		data: {
			id: string;
			source: string;
			destination: string;
			type: string;
			password: string | null;
			createdAt: string | null;
			updatedAt: string | null;
		};
	};
};
