import { fetch2 } from '../../../utils/fetch';
import { article as types } from '../../../constants/vuex';

export default {
	[types.GET_BLOG_LIST] (context, payload = {}) {
		const { commit } = context;
		const { success, error, articleId } = payload;

		const path = `/api/v1/topics/${articleId}`;
		fetch2('GET', path, {
			type: types.GET_BLOG_LIST,
			commit,
			success,
			error,
		});
	},
};
