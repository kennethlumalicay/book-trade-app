import axios from 'axios';

module.exports = function(query, response) {
	axios({
		method: 'get',
		url: 'https://www.somewhere.com/api',
		data: {
			search: query.search,
			location: query.location
		}
	}).then(res => {

	}).catch(err => {
		console.log(err);
	})
}