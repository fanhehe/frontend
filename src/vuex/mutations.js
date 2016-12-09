import { article as types } from '../constants/vuex';

export default {
	[types.GET_ARTICLE_BY_ID] (state, payload = {}) {
		const { data } = payload;
		state.article = data;
	},
	[types.GET_BLOG_LIST] (state, payload = {}) {
		const { data } = payload;
		state.blogList = data;
	},
};
