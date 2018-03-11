var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	zip_code: String,
	locations: [{
		lat_long: String,
		address: String,
		score: Number,
		//... other infor
	}]
});

module.exports = mongoose.model('Location', LocationSchema);


/*// usage for scraping
function scrape(sites, zip) {
	for(var i=0; i<sites.length; i++) {
		Location.findOne({zip_code: zip}, function (err, location) {
			if (err) {
				var newZip = new Location();
				newZip.zip_code = '10001';
				newZip.locations = [];
		
				newZip.save(function (err) {
					console.log(err);
				});
				return;
			} else {
				LIB.scrape(site, zip).then(function(res) {

					res.forEach(function(loc) {

						var stored = _where(location.locations.lat_long === loc.lat_long);
						if (!stored || loc.score > stored.score) {
							location.locations.push({
								lat_long: loc.lat_long,
								address: loc.address,
								score: loc.score
								//... other infor
							});
						}

						location.save(function (err) {
							console.log(err);
						});
					});
				});
			}
		});
	}
}
for (var zip in zips) {
	scrape(['cvs', 'dea'], zip);
}*/
