import { article as types } from '../../../common/constants/request';

export default {
	[types.GET_ALL.name] (state, payload = {}) {
		const { rows: list, pageCount } = payload.data;
		state.blogList = list;
		state.page.max = pageCount;
	},
};
