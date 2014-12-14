module.exports = {
	name: 'ember-dictionary',
	included: function(app) {
		this._super.included(app);

		app.import('dist/es6/ember-dictionary.js');
	}
};