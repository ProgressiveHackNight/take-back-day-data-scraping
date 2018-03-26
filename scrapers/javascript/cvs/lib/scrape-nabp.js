var scrapeNABP = {
	src: 'nabp',
	url: 'https://nabp.pharmacy/initiatives/awarxe/drug-disposal-locator/',
	collection: [],
	addresses: {},
	processed: 0,

	toHTML: async function (http, zip) {

		var parms = {zipcode: zip, distance: 25};		

		try {

			var html;

			var raw = await http(this.url, {params: parms, responseType: 'html'});

			var text = raw.data.replace(/\s{2,}/g, '');
		
			var regex = /<div class="ddl__locations-list">.+?<\/article><\/div>/;

			var regexMatch = text.match(regex);

			if (regexMatch !== null) {
				html = text.match(regex)[0];
			}


			return html;

		} catch (e) {
			console.log(e);
		}

	},

	toDOM: function (dom, html) {
		
		var $dom = dom(html);

		return $dom;

	},

	toJSON: function ($dom, zip, model) {

		var src = this.src,
		collection = this.collection,
		addresses = this.addresses,
		types = {
			'college': 'School',
			'duane,reade,walgreens,pharmacy,cvs,rx,drug': 'Pharmacy',
			'army,guard,naval,ft.': 'Military',
			'hospital,va': 'Hospital',
			'medicine': 'Doctor\'s Office',
			'ecopark': 'Recycling Center',
			'police,sheriff,safety,precinct,pd': 'Police',
			'county,town,municipal,village': 'Government'
		};

		$dom('article').each( (i, a) => {
			
			var note = $dom(a).find('p').eq(1).html().replace(/<br.*?\/?>/, ' ');
			
			var fullAddress = $dom(a).find('.col--minor--larger').html().replace(/<a.+\/a>(<br>)\1{0,}/, '');
			var parseAddress = fullAddress.split('<br>');
			
			var street, csz;
			
			if (!parseAddress[2]) {
				street = parseAddress[0];
				csz = parseAddress[1];
			} else {
				street = parseAddress[1];
				csz = parseAddress[2];
			}
			
			var city = csz.split(', ')[0];
			var state = csz.split(', ')[1];
			var zip = csz.split(', ')[1].replace('New York ', '');
			var latlng = $dom(a).find('.direction').attr('href').replace(/.+\?daddr=/, '');
			var lat = latlng.split(',')[0];
			var lng = latlng.split(',')[1];
			
			var m, 
				name = $dom(a).find('.title').text(), 
			address = street, 
				city = city,
			zip = zip,
				type = 'Unknown',
			phone = $dom(a).find('.tel-link').text(),
				searching = true;
			
			if (state.indexOf('New York') > -1 &&
						!addresses[address]) {

				addresses[address] = 1;

					var haystack = name.toLowerCase();

					for (var l in types) {

						var ts = l.split(',');

						if (!searching) { break; }

						for (var t = 0; t < ts.length; t++) {

							var needle = ts[t];

							if (haystack.indexOf(needle) > -1) {
								type = types[l];
								searching = false;
								break;
							}
						}
					}

				m = {
					'Location': name,
					'Street Address': address,
					'City': city,
					'Zip': zip,
					'Latitude': lat,
					'Longitude': lng,
					'Type': type,
					'Phone': phone, 
					'Note': note
				}
				
				var errors = model.validate(m);
				
				if (errors.length) {
					throw new Error(errors);
				}
				
				collection.push(m);
			}
			
		});

		this.processed++;

		console.log(`Processed: ${this.processed} of 62 zips`);
		console.log(collection);
		return this;
		
	},

	toCollection: async function (geocode) {


		// let's see one google api call working
		//var resp = await geocode('1600 Amphitheatre Parkway, Mountain View, CA')
		//	.then((resp, err) => {
		//		console.log(resp, 43);
		//	});

		//console.log(resp[0].geometry.location, 43);

		var locations = this.collection;

		return new Promise (function (resolve, reject) {
			//console.log('Latitude/Longitude updated successfully');
			resolve({locations: locations});
		});

	},

	toFile: function (fs, r) {

		var src = this.src;
		var data = r.locations;

		// write to file ../data/cvs.json
		fs.writeFile(`./data/${src}.json`, JSON.stringify(data), function(err) {
    	if(err) {
    	    return console.log(err);
    	}

    	console.log('The file was saved!');
		}); 
	}
}

module.exports = scrapeNABP;
