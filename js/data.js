class Data {
	constructor(url) {
		this.url = url;
	}

	fetchData() {
		return fetch(this.url)
							.then(this.checkStatus)
							.then(res => res.json())
							.catch(error => console.log('Looks like there was a problem', error));
	}

	checkStatus(res) {
		if (res.ok !== true) {
			return Promise.reject(new Error(`${res.status}: , ${res.statusText}:`));
		} else {
			return Promise.resolve(res);
		}
	}

}