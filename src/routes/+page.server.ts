import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import shortenerApi from '../apis/shortener-api';

const validationSchema = z.object({
	source: z.string().url('Must be a valid URL'),
	private: z.boolean(),
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(validationSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, validationSchema);
		if (!form.valid) return fail(422, { form });

		try {
			const result = await shortenerApi.post('api/shortener', {
				destination: form.data.source,
				type: form.data.private ? 'PRIVATE' : 'PUBLIC',
			});

			return { form, result };
		} catch (error) {
			return fail(400, { form });
		}
	},
};
