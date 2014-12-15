import DS from 'ember-data';
import DictionaryMixin from '../mixins/dictionary';
import Ember from 'ember';

export default DS.Model.extend(DictionaryMixin, {
	foo: DS.attr('string'),
	bar: DS.attr('number'),
	baz: DS.attr('dictionary', {
		defaultValue: Ember.Object.create()
	})
});