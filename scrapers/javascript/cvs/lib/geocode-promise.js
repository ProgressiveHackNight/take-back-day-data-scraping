async function geocodePromise (googleMapsClient, address) {

	//console.log(address);

	// Geocode an address with a promise
	return googleMapsClient.geocode({address: address}).asPromise()
	  .then((response) => {
	    //console.log(response.json.results);
			return response.json.results;
	  })
	  .catch((err) => {
	    console.log(err);
	  });
}

module.exports = geocodePromise;
