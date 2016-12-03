import { blog as types } from '../../../constants/vuex';

export default {
	[types.GET_BLOG_LIST] (state, payload = {}) {
		const { data } = payload;
		state.blogList = data;
	},
};
