function locationFinder(county, locations) {
	return locations.filter((x) => x.county === county);
}

module.exports = locationFinder;