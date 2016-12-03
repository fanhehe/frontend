export default {
	navList: [{
		id: 0,
		name: '最新',
	}, {
		id: 1,
		name: '推荐',
	}, {
		id: 2,
		name: '排名',
	}],
	blogList: [{
		author: {
			id: '',
			avatar_url: '',
			loginname: '',
		},
		author_id: '',
		id: '',
		title: '',
		content: '',
		create_at: '',
		last_reply_at: '',
		reply_count: '',
		top: false,
		visited: false,
		visit_count: '',
		classify: [],
	}],
	sliderArray: [{
		title: '最近文章',
		type: 'article',
		data: [{
			title: '',
			username: '',
			create_at: '',
		}],
	}, {
		title: '热门话题',
		type: 'topic',
		data: [{
			title: '',
			username: '',
			create_at: '',
		}],
	}],
};
