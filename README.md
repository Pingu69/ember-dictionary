# ember-dictionary

Adds a `Mixin` and a `Transform` class so that users can add a "dictionary" object to their Ember-Data models:

	export default DS.Model.extend(DictionaryMixin, {
		foo: DS.attr('string'),
		bar: DS.attr('number'),
		baz: DS.attr('dictionary')
	});
	
Where the *dictionary* will remain observable throughout the data structure and a record's `isDirty` flag will be updated appropriately.

> **Note**: this addon will also ensure the dictionary elements which are changed between commits are added to Ember Data's `_attributes` hash but the `_data` hash (a historical record of what record was before changes) is left alone ... instead there is a `_initialValues` hash which serves a similar function for the dictionaries

## Installation

This is a Ember CLI *addon* so to use this you must have ember-cli installed first and then be in your project directory before typing:

* `npm install --save-dev ember-dictionary`

Although maybe a statement of the obvious, this addon is also dependant on your use of Ember Data (which is on by default in Ember CLI); never hurts to be overly explicit. :)

## Usage ##

* Adding support for dictionaries in your model involves adding the mixin as stated below:
	
	````javascript
	import DictionaryMixin from 'ember-dictionary/mixins/dictionary';
	export default DS.Model.extend(DictionaryMixin, {
	   // your model goes here
	});
	````

	> While there is a `DictionaryTransform` that needs to be used there is nothing you explicitly need to do start using this as the Transform will already exist in the Ember apps namespace.

* New models can be created with a blueprint:

	````javascript
	ember generate dmodel [model-name]
	````

	> Note: my clumsy attempt to copy over Ember's default *model* blueprint didn't work ... will get this fixed at some point, happy to take a PR

## What's in the Box? ##

This addon will add three things:

1. `DictionaryMixin` - housekeeping methods to ensure models support dictionaries 
2. `DictionaryTransform` - serializes and deserializes the dictionary.
3. `dmodel` blueprint - a blueprint for Model's which contain "dictionaries"


For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
