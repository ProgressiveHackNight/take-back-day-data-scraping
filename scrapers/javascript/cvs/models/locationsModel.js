var locationsModel = {
	'Location': {
		type: 'string',
		required: true,
		message: 'Location (string) required'
	},
	'Street Address': {
		type: 'string',
		required: true,
		message: 'Street Address (string) required'
	},
	'City': {
		type: 'string',
		required: true,
		message: 'City (string) required'
	},
	'Zip': {
		type: 'string',
		required: true,
		message: 'Zip (string) required'
	},
	'County': {
		type: 'string'
	},
	'Phone': {
		type: 'string'
	},
	'Hours': {
		type: 'string'
	},
	'Note': {
		type: 'string'
	},
	'Latitude': {
		type: 'string',
		required: true,
		message: 'Latitude (string) required'
	},
	'Longitude': {
		type: 'string',
		required: true,
		message: 'Longitude (string) required'
	},
	'Type': {
		type: 'string',
		required: true,
		message: 'Type (string) required'
	}
};

module.exports = locationsModel;