# TBD CVS Web Scraper (Node.js)

Writes a JSON file containing drug take back locations listed on CVS website (https://www.cvs.com/content/safer-communities-locate) and NABP website (https://nabp.pharmacy/initiatives/awarxe/drug-disposal-locator/) and others?

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Developed on MacOS 10.12.6
node v7.6.0
npm v4.1.2
```

### Installing

After cloning the repository add Google API Key
```
Get Google API Key (https://developers.google.com/console)
 - This key will need to be saved in .env file in cwd directory
 - GOOGLE_MAPS_API_KEY=<Your private API key>
```
then,
```
npm install
```

in cwd directory. 



### Usage

```
node index.js --<scraper> --<env>
```
from cwd directory, where "scraper" is one of [cvs, nabp] and "env" is one of [dev, test, prod].

"dev" runs against a mocked http request to compile locations
"test" runs against 2 actual http requests to compile locations
"prod" runs all http requests (up to 62) to compile all the locations

If successful, you should see JSON file saved called ./cvs/data/<scraper>.json.

## Running the tests

Todo: Write tests

```
Todo:
npm test
```

## Built With

* [google maps api](https://github.com/googlemaps/google-maps-services-js) - Node.js client library for Google Maps API Web Services. Used to convert physical address to lat/lng
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js. Used to make http requests easier.
* [cheerio](https://www.npmjs.com/package/cheerio) - Fast, flexible & lean implementation of core jQuery designed specifically for the server. Used to make dealing with DOM easier.
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Used to simplify this task.
* [validate](https://www.npmjs.com/package/validate) - Validate object properties in javascript. Used to ensure data parsed from DOM meets DB Schema required.

## Contributing
Creating a new scraper should only require creating a js file similar to the file located in ./cvs/lib/scrape-cvs.js and adding it to the allowed scrapers in ./index.js. This file should return an object with the following signature:

```
{
	// Properties
	src: <string> Unique identifier for this scraper
	url: <string> Remote URL to request for scraping
	collection: <array> The compiled list of locations from scraper
	addresses: <object> A temporary hash variable to avoid duplicates from scraping
	processed: <number> A temporary hash variable to print progress in the CLI

	// Methods
	toHTML: <async function> Sends http request and receives html response
	toDOM: <function> Takes HTML and converts it to a DOM node with an API similar to jQuery
	toJSON: <function> Generates a validated model from the DOM node created in the toDOM function, then adds it to the collection
	toCollection: <async function> Does some additional transforms on the collection (for example geocoding), if required. Otherwise just return the collection
	toFile: <function> Converts the collection to a JSON string, then saves it to the disk.
}
```

A successful scrape should create a JSON file in ./cvs/data/<scraper>.json with this signature:

```
[{
 "Location": "Albany Police Department",
 "Street Address": "165 Henry Johnson Blvd",
 "City": "Albany",
 "Zip": "12210",
 "County": "Albany",
 "Phone": "(518) 462-8013",
 "Hours": "Available 24 hours a day, 7 days a week.",
 "Note": "Accepted: any prescription or over-the-counter medications. Not accepted: needles.",
 "Latitude": "42.662809",
 "Longitude: "-73.760516",
 "Type": "Police"
}, …]
```

Note: only "Location", "Street Address", "City", "Zip" are required


## Needs

* Tests
* Documentation
* Create different outputs based on env like ./cvs/data/<scraper>-<env>.json
* [done - 92405ba] Switch mock data as CLI input like dev/test/prod when calling 'node index.js' (I am currently commenting require statements in the code)


## License

Copyright 2018 Kalim Fleet [@twitter](https://twitter.com/kalimfleet), @gmail

Licensed under the Apache License, Version 2.0 (the "License"); you may use this file  in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.