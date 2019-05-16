import promise from 'promise';
import superagent from 'superagent';
import querystring from 'querystring';

const fetch = wrap(superagent, promise, config.host);

export default fetch;

function wrap (superagent, Promise, opts) {
	function PromiseRequest () {
		superagent.Request.apply(this, arguments);
	}
	PromiseRequest.prototype = Object.create(superagent.Request.prototype);
	/** Send request and get a promise that `end` was emitted */
	PromiseRequest.prototype.end = function (cb) {
		const _end = superagent.Request.prototype.end;
		const self = this;
		return new Promise(function (accept, reject) {
			_end.call(self, function (err, response) {
				if (cb) {
					cb(err, response);
				} else if (err) {
					err.response = response;
					reject(err);
				} else {
					accept(response);
				}
			});
		});
	};
	/** Provide a more promise-y interface */
	PromiseRequest.prototype.then = function (resolve, reject) {
		const _end = superagent.Request.prototype.end;
		const self = this;
		return new Promise(function (accept, reject) {
			_end.call(self, function (err, response) {
				if (err) {
					err.response = response;
					reject(err);
				} else {
					accept(response);
				}
			});
		}).then(resolve, reject);
	};
	const request = function (method, url) {
		const host = config.host || '';
		url = `${host}${url}`;
		return new PromiseRequest(method, url);
	};
	/** Helper for making an options request */
	request.options = function (url) {
		return request('OPTIONS', url);
	};
	/** Helper for making a head request */
	request.head = function (url, data) {
		const req = request('HEAD', url);
		if (data) {
			req.send(data);
		}
		return req;
	};
	/** Helper for making a get request */
	request.get = function (url, data) {
		const req = request('GET', url);
		if (data) {
			req.query(data);
		}
		return req;
	};
	/** Helper for making a post request */
	request.post = function (url, data) {
		const req = request('POST', url);
		if (data) {
			req.send(data);
		}
		return req;
	};
	/** Helper for making a put request */
	request.put = function (url, data) {
		const req = request('PUT', url);
		if (data) {
			req.send(data);
		}
		return req;
	};
	/** Helper for making a patch request */
	request.patch = function (url, data) {
		const req = request('PATCH', url);
		if (data) {
			req.send(data);
		}
		return req;
	};
	/** Helper for making a delete request */
	request.del = function (url) {
		return request('DELETE', url);
	};
	// Export the request builder
	return request;
}

export function fetch2 (method = 'GET', path = '', options = {}) {
	let fetchPath = {};
	let { success, error, final } = options;
	const { data, type, commit, credient, withCredentials, query, mutations } = options;

	path = `/api${path}`;
	method = method.toLowerCase();
	// 产生错误执行的函数
	error = typeof error === 'function'? error: () => {};
	// 无论如何 最终都会执行的函数
	final = typeof final === 'function'? final: () => {};
	// 成功的时候执行的函数
	success = typeof success === 'function'? success: () => {};

	fetchPath = fetch[method](path);

	if (method === 'post' && data) fetchPath = fetchPath.send(data);

	if (method === 'get' && query) fetchPath = fetchPath.query(query);

	if (withCredentials) fetchPath = fetchPath.withCredentials();

	fetchPath.end(function (err, response) {
		if (!(response instanceof Object)) return final();
		
		const status = response.status;
		const { data, code } = response.body;
		const isSuccessful = code == 200 || data instanceof Object;
		
		if (isSuccessful) {
			success();
			commit(type, { data, mutations });
		} else {
			error();
		}
		// 执行final函数
		final ();
	}).catch(function (err) {
		error();
		console.log(err.message);
	});
}
