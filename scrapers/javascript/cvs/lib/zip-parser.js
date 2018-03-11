
// use this to capture user entered zipcode
// will return center zipcode for the
// coresponding county which holds all the
// locations for the county
function zipParser(zip, zips) {
	var runtime = 0;
	for (i in zips) {
		for (var z = 0; z < zips[i].length; z++) {
			if (zip === zips[i][z]) {
				console.log(runtime);
				return i;
			}
			runtime++;
		}
		runtime++;
	}
	console.log(runtime);
}



module.exports = zipParser;
