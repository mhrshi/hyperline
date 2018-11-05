import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Setup from './components/Setup';
import Game from './components/Game';

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,

	routes: [
		{
			path: '/',
			redirect: '/game'
		},
		{
			path: '/setup',
			component: Setup,
			beforeEnter: (from, to, next) => {
				if (store.state.sessionId === undefined) {
					next();
				} else {
					next('/game');
				}
			}
		},
		{
			path: '/game',
			component: Game,
			beforeEnter: (from, to, next) => {
				if (store.state.sessionId !== undefined) {
					next();
				} else {
					next('/setup');
				}
			}
		},
		{
			path: '*',
			redirect: '/setup'
		}
	]
})
