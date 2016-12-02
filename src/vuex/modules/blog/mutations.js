import { blog as types } from '../../../constants/vuex';

export default {
	[types.GET_BLOG_LIST] (state) {
		console.log(state, 'xxxxxxxx');
	},
};
