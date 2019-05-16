import Vue from 'vue';
import { article as types } from '../../../common/constants/request';

export default {
	[types.GET_ALL_BY_TYPE.name] (state, payload = {}) {},
	[types.GET_ARTICLE_BY_ID.name] (state, payload = {}) {
		const { data } = payload;
		for (const key in data) { state[key] = data[key]; }
	},
	[types.CREATE_COMMENT.name] (state, payload) {
		// 初始化
		if (!state.comments) Vue.set(state, 'comments', { count: 0, rows: [] });
		const comments = state.comments;
		const { data, mutations } = payload;
		// 再次构造data
		data.up = { ...mutations };
		data.createTime = new Date();
		// 如果是新评论
		if (!data.parentId) return comments.rows.unshift(data);
		// 否则是某评论的回复
		for (const comment of comments.rows) {
			if (comment.id === data.parentId) {
				if (!comment.subComments) Vue.set(comment, 'subComments', { count: 0, rows: [] });
				comment.subComments.count += 1;
				comment.subComments.rows.push(data);
				break;
			}
		}
	},
	[types.DELETE_COMMENT.name] (state, payload) {},
	[types.GET_COMMENTS.name] (state, payload) {
		const { data } = payload;
		if (data && data.rows && data.rows.length) state.comments = data;
	},
};
