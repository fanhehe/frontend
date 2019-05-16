import { user as types } from '../common/constants/request';

export default {
	[types.REGISTER_WITH_EMAIL.name] (state, payload) {
		const userInfo = payload.data;
		if (userInfo) state.userInfo = { ...state.userInfo, ...userInfo };
	},
	[types.LOGIN_WITH_EMAIL.name] (state, payload) {
		const userInfo = payload.data;
		if (userInfo) state.userInfo = { ...state.userInfo, ...userInfo };
	},
	[types.REGISTER_WITH_USERNAME.name] (state, payload) {
		const userInfo = payload.data;
		if (userInfo) state.userInfo = { ...state.userInfo, ...userInfo };
	},
	[types.LOGIN_WITH_USERNAME.name] (state, payload) {
		const userInfo = payload.data;
		if (userInfo) state.userInfo = { ...state.userInfo, ...userInfo };
	},
	[types.LOGOUT.name] (state, payload) {
		state.userInfo = {};
	},
	[types.GET_USER_INFO_BY_USERNAME.name] (state, payload) {
		const userInfo = payload.data;
		if (userInfo) state.userInfo = { ...state.userInfo, ...userInfo };
	},
};
