export default {
	navList: [{
		id: 0,
		name: '最新',
	}, {
		id: 1,
		name: '全部',
	}, {
		id: 2,
		name: '排名',
	}],
	page: {
		max: 1,
		limit: 9,
	},
	blogList: [{
		id: '',
		author: '',
		title: '',
		content: '',
		createTime: '',
		lastReplyTime: '',
		replyCounts: '',
		top: false,
		visited: false,
		visitCounts: '',
		classify: [],
		up: {
			username: '',
			nickname: '',
			preview: '',
		},
	}],
	sliderArray: [{
		title: '最近文章',
		type: 'article',
		data: [{
			title: '',
			username: '',
			createTime: '',
		}],
	}, {
		title: '热门话题',
		type: 'topic',
		data: [{
			title: '',
			username: '',
			createTime: '',
		}],
	}],
};
