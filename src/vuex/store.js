import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import modules from './modules';
import actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules,
});
