var scrape = require('./lib/scrape');

var args = process.argv;
var env = ['--dev', '--test', '--prod'].indexOf(args[3]) > -1 ? args[3] : '--dev';

var scraper = args[2];

switch(scraper) {
	case '--cvs':
		scrape(require('./lib/scrape-cvs'), env);
		break;
	case '--nabp':
		scrape(require('./lib/scrape-nabp'), env);
		break;
	default:
		scrape(require('./lib/scrape-cvs'), env);
}
