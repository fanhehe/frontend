import * as utils from '../utils';
import { fetch2 } from '../utils/fetch';
import * as types from '../constants/vuex';

const SEARCH_HISTORY = 'SEARCH_HISTORY';

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
	[types.GET_BLOG_LIST] (context, payload = {}) {
		const limit = 6;
		const path = '/api/v1/topics';

		const { commit } = context;
		const { success, error, data, param } = payload;
		fetch2('GET', path, {
			type: types.GET_BLOG_LIST,
			commit,
			success,
			error,
			data,
			param: {
				limit,
				...param,
			}
		});
	},
};
