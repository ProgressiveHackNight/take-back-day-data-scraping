function HTMLfromHTTP (src) {

	var http = require(`../data/scrape-addresses-${src}.js`);
	
	return {
		get: async function (url, parms) {
			var resp = await http;
			return {data: resp}
		}
	}
}

module.exports = HTMLfromHTTP;
