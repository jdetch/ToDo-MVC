import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo text field"
      var title = this.get('newTitle');

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
          title: title,
          isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', "");

      // Save the new model
      todo.save();
    },

    clearCompleted: function() {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  allAreDone: function(key, value) {
    console.log(key + ": " + value);
    if (value === undefined) {
      return this.get('length') > 0 && this.isEvery('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

  hasCompleted: function() {  // Do we have at least one todo that has been completed?
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {     // Counts the number of completed todos (if we have any)
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),  

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return (remaining === 1) ? 'item' : 'items';
  }.property('remaining')
});
