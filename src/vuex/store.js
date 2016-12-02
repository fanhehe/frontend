import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import modules from './modules';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);
console.log(modules);
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules,
});
