import {
  moduleForModel,
  test
} from 'ember-qunit';
import DS from 'ember-data';
// import DictionaryMixin from '../../../mixins/dictionary-model';
import Ember from 'ember';

moduleForModel('dummy', 'Dummy Dictionary', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('"baz" is defined as dictionary', function() {
	var model = this.subject();
	model.eachAttribute(function(item,meta) {
		if(item === 'baz') {
			ok(meta.type === 'dictionary');
		}
	});
});

test('should be able to hold all types of variables in the dictionary', function() {
	var model = this.subject();
	expect(5);
	model.set('baz.one','testing');
	model.set('baz.two',123);
	model.set('baz.three',[1,2,3]);
	model.set('baz.four',{id: 1, name: 'test object'});
	model.set('baz.five', [
		{id: 1, name: 'object in array'},
		{id: 1, name: 'object in array'}
	]);
	
	ok(Ember.typeOf(model.get('baz.one')) === 'string');
	ok(Ember.typeOf(model.get('baz.two')) === 'number');
	ok(Ember.typeOf(model.get('baz.three')) === 'array');
	ok(Ember.typeOf(model.get('baz.four')) === 'object');
	ok(Ember.typeOf(model.get('baz.five')) === 'array');
});

test('it has registered the dictionary element', function() {
	var model = this.subject();
	
	equal(model.get('currentDynamicProps'), ['baz']);
});
