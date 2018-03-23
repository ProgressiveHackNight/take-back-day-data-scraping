# TBD CVS Web Scraper (Node.js)

Writes a JSON file containing drug take back locations listed on CVS website (https://www.cvs.com/content/safer-communities-locate)

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
 - This key will need to be saved in .env file in ./cvs directory
 - GOOGLE_MAPS_API_KEY=<Your private API key>
```
then,
```
npm install
```

in ./cvs directory. 



Finally run

```
node index.js
```
from ./cvs directory.

If successful, you should see JSON file saved called ./cvs/data/cvs.json.

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



## Needs

* Tests
* Documentation
* Switch mock data as CLI input like dev/test/prod when calling 'node index.js' (I am currently commenting require statements in the code)


## License

Copyright 2018 Kalim Fleet

Licensed under the Apache License, Version 2.0 (the "License"); you may use this file  in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.