
export const user = {
	"REGISTER_WITH_EMAIL": {
		"path": "/user/registerWithEmail",
		"method": "POST",
		"name": "REGISTER_WITH_EMAIL"
	},
	"GET_USER_INFO_BY_ID": {
		"path": "/user/getUserInfoById",
		"method": "POST",
		"name": "GET_USER_INFO_BY_ID"
	},
	"GET_USER_INFO_BY_USERNAME": {
		"path": "/user/getUserInfoByUsername",
		"method": "POST",
		"name": "GET_USER_INFO_BY_USERNAME"
	},
	"LOGIN_WITH_EMAIL": {
		"path": "/user/loginWithEmail",
		"method": "POST",
		"name": "LOGIN_WITH_EMAIL"
	},
	"LOGOUT": {
		"path": "/user/logout",
		"method": "GET",
		"name": "LOGOUT"
	},
	"REGISTER_WITH_USERNAME": {
		"path": "/user/registerWithUsername",
		"method": "POST",
		"name": "REGISTER_WITH_USERNAME"
	},
	"LOGIN_WITH_USERNAME": {
		"path": "/user/loginWithUsername",
		"method": "POST",
		"name": "LOGIN_WITH_USERNAME"
	}
};

export const article = {
	"GET_ALL": {
		"path": "/article/getAll",
		"method": "GET",
		"name": "GET_ALL",
		"limit": 8
	},
	"GET_ALL_BY_TYPE": {
		"path": "/article/getAllByType",
		"method": "GET",
		"name": "GET_ALL_BY_TYPE",
		"limit": 8
	},
	"GET_ARTICLE_BY_ID": {
		"path": "/article/getArticleById",
		"method": "GET",
		"name": "GET_ARTICLE_BY_ID",
		"limit": 8
	},
	"CREATE_COMMENT": {
		"path": "/article/createComment/",
		"method": "POST",
		"name": "CREATE_COMMENT"
	},
	"DELETE_COMMENT": {
		"path": "/aricle/createComment/",
		"method": "DELETE",
		"name": "DELETE_COMMENT"
	},
	"GET_COMMENTS": {
		"path": "/article/getComments",
		"method": "GET",
		"name": "GET_COMMENTS",
		"limit": 5
	},
	"GET_CHILD_COMMETNS": {
		"path": "/article/getChildComments",
		"method": "GET",
		"name": "GET_CHILD_COMMETNS",
		"limit": 5
	},
};
