//var fromHTTP = require('../lib/html-from-http');
var fromHTTP = require('axios');
var fromHTML = require('cheerio');
var schema = require('validate');

 async function scrape (zips, scraper) {

	var html, dom, json;
	var collection = [];
	var scraped;

		for (zip in zips) {

			// 20 miles give quite a bit of overlap
			//  - consider reducing to 10 miles
			var parms = {zipcode: zip, distance: 20}

			var html = await scraper.toHTML(fromHTTP.get, parms);

			var $dom = scraper.toDOM(fromHTML.load, html);

			var model = schema({
				address: {
					type: 'string',
					required: true,
					message: 'Address (string) required'
				},
				city: {
					type: 'string',
					required: true,
					message: 'City (string) required'
				},
				state: {
					type: 'string',
					required: true,
					message: 'State (string) required'
				},
				zip: {
					type: 'string',
					required: true,
					message: 'Zip (string) required'
				},
				src: {
					type: 'string',
					required: true,
					message: 'Src (string) required'
				},
				county: {
					type: 'string',
					required: true,
					message: 'County (string) required'
				}
			});

			scraper.toJSON($dom, zip, model)

		}

		scraper.toCollection()
				// Send to DB
				.then((r) => { console.log(r, 49) })
				.catch((e) => { console.log(e) });
}

module.exports = scrape;
