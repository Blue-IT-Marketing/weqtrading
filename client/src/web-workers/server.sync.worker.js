//import Axios from 'axios'
//import axios from 'axios';
const debounce = (func, delay) => {
	let inDebounce;
	return function() {
		const context = this;
		const args = arguments;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

export default () => {
	self.addEventListener('message', e => {// eslint-disable-line no-restricted-globals
		if (!e) return;
		let sync_data = e.data;
		let worker_done = false;
		let worker_results;
		let error_count = 0;


		try {

			let do_sync = async () => {
				if (worker_done) {
					return true;
				}

				if (error_count > 5) {
					return false;
				}

				switch (sync_data.method_type) {
				case 'post':

					fetch(sync_data.backend_url, {
						method: 'post',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(sync_data.payload)

					}).then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('Error on worker while fetching post requesting');
						}
					}).then(json_data => {
						worker_done = true;
						worker_results = JSON.parse(json_data);
						// eslint-disable-next-line no-console
						console.log('Worker results : ', worker_results);
					}).catch(err => {
					    // eslint-disable-next-line no-console
						console.log('error on worker ', sync_data.backend_url, err.message);
						error_count++;
					});
					break;

				case 'get':

					fetch(sync_data.backend_url, {
						method: 'get',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}

					}).then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('Error while fetching get request with worker on ', sync_data.backend_url);
						}
					}).then(json_data => {
						worker_done = true;
						worker_results = JSON.parse(json_data);
					}).catch(err => {
					    // eslint-disable-next-line no-console
						console.log('Error : ', err.message);
						error_count++;
					});
                    // eslint-disable-next-line no-console
					console.log('this is a get request');
					break;

				case 'put':
					fetch(sync_data.backend_url, {
						method: 'put',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(sync_data.payload)

					}).then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('Error fetching put request on worker from ', sync_data.backend_url);
						}
					}).then(json_data => {
						worker_results = JSON.parse(json_data);
						worker_done = true;
					}).catch(err => {
					    // eslint-disable-next-line no-console
						console.log('Error ', err.message_error);
						error_count++;
					});
					// eslint-disable-next-line no-console
					console.log('this is a put request');
					break;
				case 'delete':
					fetch(sync_data.backend_url, {
						method: 'delete',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(sync_data.payload)
					}).then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('an Error occured while fetching a delete request on worker ', sync_data.backend_url);
						}
					}).then(json_data => {
						worker_results = JSON.parse(json_data);
						worker_done = true;

					}).catch(err => {
					    // eslint-disable-next-line no-console
						console.log('Error : ', err.message);
						error_count++;
					});
					// eslint-disable-next-line no-console
					console.log('this is a delete request');
					break;
				default:
					error_count = 101;
					// eslint-disable-next-line no-console
					console.log('WE are just running default now');
					break;
				}

				debounce(do_sync(), 5000);
			};

			if (do_sync()) {
				postMessage({
					message: 'success',
					worker_results: worker_results
				});
			} else {
				postMessage({
					message: 'error',
					worker_results: {}
				});
			}
		}catch (e) {
			postMessage({
				message: 'fatality',
				worker_results : {}
			});

		}

	});
};
