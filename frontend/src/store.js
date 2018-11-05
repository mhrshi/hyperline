import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		socket: io(`${process.env.NODE_ENV === 'development'
					? 'localhost:5000'
					: 'hyperline.herokuapp.com'}`,
					{ path: '/backend/' }),
		sessionId: undefined,
		marker: 0,
		p1: '',
		p2: '',
		firstTurn: 'p1',
		starter: false
	},

	mutations: {
		assignSession(state, { id, marker, starter }) {
			state.sessionId = id;
			state.marker = marker;
			state.starter = starter;
		},

		setPlayerNames(state, { p1, p2 }) {
			state.p1 = p1;
			state.p2 = p2;
		},

		invertStarter(state) {
			state.starter = !state.starter;
			state.firstTurn = state.firstTurn.endsWith('1') ? 'p2' : 'p1';
		}
	}
});
