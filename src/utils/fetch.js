import promise from 'promise';
import superagent from 'superagent';

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

export function fetch2 (method, path, options) {
	let fetchPath = {};
	let { success, error } = options;
	const { data, type, commit} = options;

	method = method.toLowerCase();
	fetchPath = fetch[method](path);
	error = typeof error === 'function'? error: () => {};
	success = typeof success === 'function'? success: () => {};

	if (method === 'post' && data) {
		fetchPath = fetchPath.send(data)
	}

	fetchPath.end(function (err, response) {
		const status = response.status;
		const { data, success: successful } = response.body;
		const isSuccessful = successful || status == 200 || data;

		if (isSuccessful) {
			success();
			commit(type, {
				data,
			});
			
		} else {
			error();
		}
	}).catch(function (err) {
		console.log(err.message);
	});
}
