import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('todos', {path: '/'});
});

export default Router; // ember CLI magic that means you don't get global variables
