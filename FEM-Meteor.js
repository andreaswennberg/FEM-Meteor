Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {
  Meteor.subscribe('all-comments');

  Meteor.methods({
    callMe: function(name){
      console.log('simulation: ' + name);
    }
  });

  Template.registerHelper('get', function(key){
      return Session.get(key);
  });

  var counter = 1;
  setInterval(function(){
     Session.set('counter', ++counter)
  }, 1);

  Meteor.call('callMe', 'Andreas', function(err, result){
    if (err) throw err;
    console.log(result);
  });

  Template.CommentList.helpers({
    comments: function(){
      return Comments.find();
    },
    formatTimestamp: function(timestamp){
      var fromnow = moment(timestamp).fromNow();
      return fromnow;
    }
  });

  Template.CommentAdd.events({
    'submit form': function(e, tmpl){
      e.preventDefault();

      var formEl = tmpl.find('form');
      var commentEl = tmpl.find('[name=comment]');
      var comment = commentEl.value;

      Comments.insert({
        login: 'cmather',
        timestamp: new Date,
        room: 'main',
        comment: comment
      });
      formEl.reset();
    }
  });
}

if (Meteor.isServer) {
  Comments.allow({
    insert: function(userId, doc){
      return !!userId;
    },
    update: function(userId, doc){
      return false;
    },
    remove: function(userId, doc){
      return false;
    }
  });

  Meteor.methods({
    callMe: function(name){
      return "Hello, " + name;
    }
  });
  Meteor.publish('all-comments', function(){
    if(this.userId){
      return Comments.find();
    } else {
      return this.ready();
    }
  });
}
