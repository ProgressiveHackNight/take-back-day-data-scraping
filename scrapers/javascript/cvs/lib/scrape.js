//var fromHTTP = require('../lib/html-from-http');
var fromHTTP = require('axios');
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

			var model = locationsModel;

			scraper.toJSON($dom, zip, validate(model));

		}

		scraper.toCollection(geocodePromise)
				// Send to DB
				.then((r) => { scraper.toFile(fs, r); })
				.catch((e) => { console.log(e) });
}

module.exports = scrape;
