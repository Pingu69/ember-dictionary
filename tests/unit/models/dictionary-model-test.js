import {
  moduleForModel,
  test
} from 'ember-qunit';
import DS from 'ember-data';
import DictionaryModel from '../../../models/dictionary-model';

moduleForModel('dictionary-model', 'DictionaryModel', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('it can be extended', function() {
	var miniMe = DictionaryModel.extend({
		foo: DS.attr('string')
	});
	ok(!!miniMe);
});

test('it can be extended with a dictionary attribute', function() {
	var miniMe = DictionaryModel.extend({
		foo: DS.attr('string'),
		bar: DS.attr('dictionary')
	});
	ok(!!miniMe);
});
