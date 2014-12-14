import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	registerRecursively: function(toTraverse, path, propsToObserve) {
		if (Ember.isArray(toTraverse)) {
			propsToObserve.addObject(path + '.@each');
			if (toTraverse.length > 0){
				this.registerRecursively(toTraverse[0], path + '.@each', propsToObserve);  
			}
		} else if (!(toTraverse instanceof Ember.Object)) {
			propsToObserve.addObject(path);
		} else {
			Ember.keys(toTraverse).forEach(function(propertyName) {
				this.registerRecursively(Ember.get(toTraverse, propertyName), path + '.' + propertyName, propsToObserve);
			}, this);
		}
	},
	addDynamicObserver: function(rootObservedProperty) {
		// save the initial values in case change takes place
		// note: would be nice to leverage Ember's `_data` property but that's being overwritten by default
		var initialValues = this.get('_initialValues');
		initialValues[rootObservedProperty] = this.get(rootObservedProperty);
		this.set('_initialValues', JSON.parse(JSON.stringify(initialValues)));
		
		var propertyToAnalyze = this.get(rootObservedProperty),
			propsToObserve = Ember.A([]),
			currentDynamicProps = this.get('currentDynamicProps'),
		propsToRemove = currentDynamicProps.filter(function(prop) {
			return new RegExp('^' + prop + '.').test(prop);
		});
		propsToRemove.forEach(function(prop) {
			console.log('removing %s observer', prop);
			Ember.removeObserver(prop, this, '_propertyDidChange');
		}, this);
		currentDynamicProps.removeObjects(propsToRemove);
		this.registerRecursively(propertyToAnalyze, rootObservedProperty, propsToObserve);

		propsToObserve.forEach(function(prop) {
			console.log('registering %s observer', prop);
			Ember.addObserver(this, prop, this, '_propertyDidChange');
		}, this);
		currentDynamicProps.addObjects(propsToObserve);
	},
	_propertyDidChange: function(sender, key, value, rev) {
		var timestamp = new Date().getTime();
		// record the array of changes made to observed properties
		this.propertyWillChange('dirtyDictionaryProps');
		this.get('dirtyDictionaryProps').pushObject({time: timestamp, sender: sender, key: key, value: value, rev: rev});
		this.propertyDidChange('dirtyDictionaryProps');
		
		// save changed value to Ember-Data's _attributes hash to give complete view on changed attributes
		var attributes = this.get('_attributes');
		if(key.indexOf('@') > -1) {
			var arrayProp = key.substr(0,key.indexOf('.@'));
			var itemProp = key.substr(key.indexOf('.@each.')+7);
			this.get(arrayProp).forEach(function(item, index) {
				if(item[itemProp] !== this.get('_initialValues.%@.%@.%@'.fmt(arrayProp, index, itemProp))) {
					attributes['%@.%@.%@'.fmt(arrayProp, index, itemProp)] = item[itemProp];
				}
			}, this);
		} else {
			attributes[key] = this.get(key);
		}
		this.propertyWillChange('_attributes');
		this.set('_attributes', attributes);
		this.propertyDidChange('_attributes');
		
		// make the record dirty
		this.send('becomeDirty');
	},
	addDynamicObservers: function() {
		this.get('propertiesToAnalyze').forEach(this.addDynamicObserver, this);
	},
	_initialise: function() {
		var self = this;
		try {
			this.eachAttribute(function(prop,meta) {
				if(meta.type === "dictionary") {
					Ember.addObserver(self, prop, self, Ember.run.bind(self, self.addDynamicObserver, prop));
				}
			});			
		} catch (e) {
			console.warning('Dictionary mixin did not initialise. Note: the dictionary mixin should only be used by a Model-derived class.');
		}
	}.on('init'),
	_clearOnUpdate: function() {
		var attributes = this.get('_attributes');
		this.set('dirtyDictionaryProps',Ember.A([]));
		// note: the _attributes property is managed by Ember typically
		// and if an Ember managed property is updated on a save() call then it will clear this hash
		// itself but if the only changed properties are on the dictionary(s) then we need to clean it
		// up ourselves.
		var dictionaryProps = Ember.keys(attributes).filter(function(item) {
			return item.indexOf('.') > -1; // all dictionaries will have a depth of at least two (base dictionary and the prop name)
		},this);
		if (dictionaryProps.length !== Ember.keys(attributes).length) {
			console.log('unexpected leftover "_attributes": %o', Ember.keys(attributes));
		} else {
			this.propertyWillChange('_attributes');
			this.set('_attributes', {});
			this.propertyDidChange('_attributes');
		}
		return true;
	}.on('didUpdate'),
	
	dirtyDictionaryProps: Ember.A([]),
	_initialValues: {},
	currentDynamicProps: Ember.A([])
});
