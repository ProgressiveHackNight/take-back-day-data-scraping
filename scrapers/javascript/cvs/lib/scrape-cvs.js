var scrapeCVS = {
	src: 'cvs',
	url: 'http://www.cvssavingscentral.com/storelocator/SaferCommunities.aspx',
	parms: {},
	collection: [],

	toHTML: async function (http, parms) {
		
		try {

			var raw = await http(this.url, {params: parms, responseType: 'html'});

			var text = raw.data.replace(/\s{2,}/g, '');
		
			var regex = /<table class="address_table".+?<\/table>/;

			var html = text.match(regex)[0];

			return html;

		} catch (e) {
			console.log(e);
		}

	},

	toDOM: function (dom, html) {
		
		var $dom = dom(html);

		$dom('tr').eq(0).remove();

		return $dom;

	},

	toJSON: function ($dom, model) {

		var src = this.src,
		collection = this.collection;

		$dom('tr').each( (i, tr) => {
			
			var m;
			
			$children = $dom(tr).children();
			
			m = {
				address: $children.eq(1).text(),
				city: $children.eq(2).text(),
				state: $children.eq(3).text(),
				zip: $children.eq(4).text(),
				src: src
			}
			
			var errors = model.validate(m);
			
			if (errors.length) {
				throw new Error(errors);
			}
			
			collection.push(m);
			
		});
		
		return this;
		
	},

	toCollection: function () {

		var collection = this.collection,
			src = this.src;

		return new Promise (function (resolve, reject) {
			resolve({src: src, collection: collection});
		});

	}
}

module.exports = scrapeCVS;
