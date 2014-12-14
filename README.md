# ember-dictionary

Adds a `Model` and a `Transform` class so that users can add a "dictionary" object to their Ember-Data models:

	export default DictionaryModel.extend({
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

* If you want to convert a model to a "dictionary enabled model", change from:
	
	````javascript
	export default DS.Model.extend({
	   // you're model goes here
	});
	````

	to 

	````javascript
	import DictionaryModel from 'ember-dictionary';
	export default DictionaryModel.extend({
	   // you're model goes here
	});
	````

* To aid in this process a generator has been included so that if you're creating a new model you can simply type:

	````javascript
	ember generate dmodel [model-name]
	````

## What's in the Box? ##

This addon will add three things:

1. `DictionaryModel` - provides a few housekeeping methods to ensure the dictionaries are observed correctly but otherwise serves as a very close cousin to the `Ember.Model` parent class.
2. `DictionaryTransform` - serializes and deserializes the dictionary.
3. `dmodel` - a blueprint for Model's which contain "dictionaries"; this is a copy of the Ember CLI's model blueprint with the minor variation being that it inherits from `DictionaryModel` than `Model`


For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
