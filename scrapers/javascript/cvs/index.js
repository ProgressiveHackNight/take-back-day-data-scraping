//var zips = require('./data/zips-ny.json');
var zips = require('./data/zips-ny_bk_2.json');
//var zips = {'10024': []}
var scrapeCVS = require('./lib/scrape-cvs');
var scrape = require('./lib/scrape');

scrape(zips, scrapeCVS);
