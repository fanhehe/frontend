import { fetch2 } from '../../../utils/fetch';
import { blog as types } from '../../../constants/vuex';

export default {
	[types.GET_BLOG_LIST] (context, payload = {}) {
		const limit = 6;
		const path = '/api/v1/topics';

		const { commit } = context;
		const { success, error, data, param } = payload;
		fetch2('GET', path, {
			type: types.GET_BLOG_LIST,
			commit,
			success,
			error,
			data,
			param: {
				limit,
				...param,
			}
		});
	},
};
