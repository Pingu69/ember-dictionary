import DS from 'ember-data';

export default DS.Transform.extend({
	deserialize: function(toTraverse) {
		// console.log('deserialising dictionary');
		var hash;
		if (Ember.isArray(toTraverse)) {
			return Ember.A(toTraverse.map(function(item){
				return this.deserialize(item);
			}, this));
		} else if (!Ember.$.isPlainObject(toTraverse)) {
			return toTraverse;
		} else {
			hash = this.generatePlainObject(Object.keys(toTraverse), Object.keys(toTraverse).map(function(key) {
				return this.deserialize(Ember.get(toTraverse, key));
			}, this));
			return Ember.Object.create(hash);
		}
	},
	serialize: function(deserialized) {
		console.log('serialising dictionary');
		return deserialized;
	},
	generatePlainObject: function(keys, values) {
		var ret = {};
		keys.forEach(function(key, i) {
			ret[key] = values[i];
		});
		return ret;
	}
});
