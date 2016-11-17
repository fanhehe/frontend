import * as utils from '../utils';

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
