#### Notes when developing

Here is an example when we access a datacontext or object with spacebars. So, comments is a function that we specified in the JS file and then login is properties on that object.

{{# each comments}}
  <li>
    <div>
      {{login}}
    </div>
    <div>
      {{comment}}
    </div>
    <div>
      {{timestamp}}
    </div>
  </li>
{{else}}

Block helpers - provide a block of HTML.

The templates that we create server side will be compiled to JavaScript objects that we can call server or client side with

Template.TemplateName.helpers
Template.TemplateName.events

{{#each comments}}
#each is a helper and comments is the argument which is a function.

Cursor - think of it as a regular javascript object that has some functions that we can call. It represents a set of data. It represents the records and the rows.

There is a API compatible client side database instance called Minimongo.

Template.templatename.events({
    submit is the event
    form is the selector, what we want to apply the event to
    'submit form': function(e, tmpl){
      e.preventDefault();



    }
});

e - there is an event object that the browser creates for us to any of the events. We can add properties or call functions on that object.
tmpl - Meteor is giving it as an object to us. We can to it with rendering. Like, calling find.

RPC - Remote Procedure Call.

There are wires between the connected clients and the database.

Event - what event do you want to listen to? What do you want to happen?

Helper - Something that we specify that should happen. Something that we call when we create the template.

If we create a Mongo collections in the client only, there will be no server side collections to call.

Call a function with timestamp property as a parameter
  {{formatTimestamp timestamp}}
#### HTTP, DDP and Websockets
HTTP used to be a stateless protocol. We used to request files and get files back. What if we want to keep the connection?

AJAX - make requests out of the regular cycle. AJAX is also HTTP but in the JavaScript.

Polling - every couple of seconds we make an AJAX request. One of the problems is that it is inefficient and slow.

Long polling - keep the connection open until you get a response. We need a stateful protocol. Websockets is a way to make this possible.

Websockets is the ability to open up a connection and keep it open and send data back and forth. The server has a connection in memory that it keeps. Likewise, the client has a connection. We generally send JSON back and forth.

Meteor creates a persistent connection. The initial request is talking to a HTTP server. One of the files is a piece of software that opens up a connection called DDP - distributed data protocol.

DDP is a package that keeps the connection open and pass data over the wire. It is sending JSON messages.

A real time connection where data goes back and forth.

####Publish and subscribe  

Client can subscribe something that is published on the server. What the server decides to send, the client can receive.

When we hit subscribe, there will open a DDP connection that we can see in the network tab under websocket.

When we subscribe, there will open up a DDP connection where the corresponding collections are added. Then there will be ping/pong to look for updates.

Mergebox: compares two subscriptions and only adds the fields that are different

#### Server side debugging

Can do with NPM node-inspector.

Start app with NODE_OPTIONS="--debug" meteor
and then in a new window do node-inspector

#### Remote Procedure Calls

Call a function on a remote machine and get a response.

Machine 1 call a function on machine 2 and the machine 2 return a value.

In Meteor these are called Meteor Methods.

Example of method call:

Meteor.call('callMe', 'Andreas', function(err, result){
  if (err) throw err;
  console.log(result);
})

Example of method definition:

Meteor.methods({
  callMe: function(name){
    return "Hello, " + name;
  }
});

Apply is useful when we don't know how many arguments we will have because we pass an argument.

Anywhere we can't write directly to the collection, we can use a method.

#### Latency compensation

Method Stub - a method that runs on the client.

#### Security

Only publish to people that are signed in
Meteor.publish('all-comments', function(){
  if(this.userId){
    return Comments.find();
  } else {
    return this.ready();
  }
});

#### Oplog tailing

Oplog is a collection where all the changes in collections will be seen.

#### Session

Session.set('counter', 0);
is a reactive datasource. We have done it automatically with cursors. We use it when we want to change the state of the app. Like, is the form open or closed.

Reactive is basically functions that are rerun.
