import pubsub from 'pubsub-js';
import * as utils from '../utils';
import { fetch2 } from '../utils/fetch';
import { user as types } from '../common/constants/request';

const SEARCH_HISTORY = 'SEARCH_HISTORY';

export default {
	[types.REGISTER_WITH_EMAIL.name] ({ commit }, payload) {
		const { method, path, name: type } = types.REGISTER_WITH_EMAIL;
		fetch2(method, path, { type, commit, ...payload, withCredentials: true });
	},
	[types.LOGIN_WITH_EMAIL.name] ({ commit }, payload) {
		const { path, method, name: type } = types.LOGIN_WITH_EMAIL;
		fetch2(method, path, { type, commit, ...payload, withCredentials: true });
	},
	[types.REGISTER_WITH_USERNAME.name] ({ commit }, payload) {
		const { method, path, name: type } = types.REGISTER_WITH_USERNAME;
		fetch2(method, path, { type, commit, ...payload, withCredentials: true });
	},
	[types.LOGIN_WITH_USERNAME.name] ({ commit }, payload) {
		const { path, method, name: type } = types.LOGIN_WITH_USERNAME;
		fetch2(method, path, { type, commit, ...payload, withCredentials: true });
	},
	[types.LOGOUT.name] ({ commit }, payload) {
		const { path, method, name: type } = types.LOGOUT;
		fetch2(method, path, { type, commit, withCredentials: true });
	},
	[types.GET_USER_INFO_BY_USERNAME.name] ({ commit, state }, payload) {
		const { path, method, name: type } = types.GET_USER_INFO_BY_USERNAME;
		fetch2(method, path, { commit, type, withCredentials: true });
	},
	message (context, payload) {
		pubsub.publish('message', payload);
	},
	warn (context, payload) {
		let message = payload.message;
		if (typeof payload === 'string') message = payload;
		pubsub.publish('message', { type: 'warn', message });
	},
	error (context, payload) {
		let message = payload.message;
		if (typeof payload === 'string') message = payload;
		pubsub.publish('message', { type: 'error', message });
	},
	info (context, payload) {
		let message = payload.message;
		if (typeof payload === 'string') message = payload;
		pubsub.publish('message', { type: 'info', message });
	},
};

export function getSearchHistory () {
	const name = SEARCH_HISTORY;
	const getItem = utils.getItemFromStorage;
	const value = getItem(name);
	return value || [];
}

export function setSearchHistory ({ state, commit }, payload) {
	const name = SEARCH_HISTORY;
	const value = payload.value;
	const maxLength = 5;
	const { setItemIntoStorage: setItem, getItemFromStorage: getItem } = utils;
	let historyArray = getItem(SEARCH_HISTORY);
	historyArray = historyArray instanceof Array ? historyArray : [];
	historyArray.length >= maxLength ? historyArray.pop() : '';
	historyArray.unshift(value);
	setItem(name, historyArray);
	return true;
}
