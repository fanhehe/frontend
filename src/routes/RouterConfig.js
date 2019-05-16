export default function RouterConfig (router) {
	router.beforeEach((to, from, next) => {
		document.body.scrollTop = 0;
		console.log(to, from, next);
	});
}
