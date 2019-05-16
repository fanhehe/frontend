export default {
	id: '',
	up: {
		name: '',
		preview: ''
	},
	title: '',
	content: '',
	replyCounts: 0,
	visitCounts: 0,
	createTime: '',
	characters: 0,
	likes: 0,
	comments: {
		count: 0,
		rows: [{
			id: 0,
			parentId: null,
			username: '',
			replyTo: '',
			up: {
				username: '',
				preview: ''
			},
			content: '',
			createTime: '',
			subComments: {
				count: 0,
				rows: [{
					id: 0,
					parentId: null,
					username: '',
					replyTo: '',
					content: '',
					createTime: '',
					up: {
						username: '',
						preview: ''
					},
				}]
			},
		}]
	}
};
