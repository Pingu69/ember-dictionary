import DS from 'ember-data';
import DictionaryModel from '../models/dictionary-model';
import Ember from 'ember';

export default DictionaryModel.extend({
	foo: DS.attr('string'),
	bar: DS.attr('number'),
	baz: DS.attr('dictionary', {
		defaultValue: Ember.Object.create()
	})
});