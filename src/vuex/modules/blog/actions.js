import { fetch2 } from '../../../utils/fetch';
import { article as types } from '../../../common/constants/request';

export default {
	[types.GET_ALL.name] ({ commit }, payload = {}) {
		const { path, method, name: type } = types.GET_ALL;
		fetch2(method, path, { type, commit, ...payload });
	},
};
