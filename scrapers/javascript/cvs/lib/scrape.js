var fromHTML = require('cheerio');
var validate = require('validate');
var locationsModel = require('../models/locationsModel');
var fs = require('fs');

require('dotenv').config();
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});

var geocodePromise = require('../lib/geocode-promise')
	.bind(null, googleMapsClient);

 async function scrape (scraper, env) {

	var fromHTTP, zips;

	if (env === '--dev' || env === '--test') {
		fromHTTP = require('../lib/html-from-http')(scraper.src);
		zips = require('../data/zips-ny_bk_2.json');
	}  else if (env === '--prod') {
		fromHTTP = require('axios');
		zips = require('../data/zips-ny.json');
	}



	var html, dom, json;
	var collection = [];
	var scraped;

		for (zip in zips) {

			var html = await scraper.toHTML(fromHTTP.get, zip);

			if (html) {
				var $dom = scraper.toDOM(fromHTML.load, html);
			
				var model = locationsModel;
			
				scraper.toJSON($dom, zip, validate(model));
			}

		}

		scraper.toCollection(geocodePromise)
				// Send to DB
				.then((r) => { scraper.toFile(fs, r); })
				.catch((e) => { console.log(e) });
}

module.exports = scrape;
