import { fetch2 } from '../../../utils/fetch';
import { article as types } from '../../../common/constants/request';

export default {
	[types.GET_ARTICLE_BY_ID.name] ({ commit }, payload = {}) {
		const { path, method, name: type } = types.GET_ARTICLE_BY_ID;
		fetch2(method, path, { type, commit, ...payload });
	},
	[types.CREATE_COMMENT.name] ({ commit }, payload = {}) {
		const { path, method, name: type } = types.CREATE_COMMENT;
		fetch2(method, path, { type, commit, ...payload });
	},
	[types.DELETE_COMMENT.name] ({ commit }, payload = {}) {
		const { path, method, name: type } = types.DELETE_COMMENT;
		fetch2(method, path, { type, commit, ...payload });
	},
	[types.GET_COMMENTS.name] ({ commit }, payload = {}) {
		const { path, method, name: type } = types.GET_COMMENTS;
		fetch2(method, path, { type, commit, ...payload });
	}
};
