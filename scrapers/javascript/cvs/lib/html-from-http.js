var http = require('../data/scrape-addresses.js');

var HTMLfromHTTP = {
	get: async function (url, parms) {
		var resp = await http;
		return {data: resp};
	}
}

module.exports = HTMLfromHTTP;
