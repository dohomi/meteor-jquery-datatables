var rowCount;

this.Reactive = new Meteor.Collection("reactive");

if (Meteor.isClient) {
  Session.setDefault("reactive-query", {});
  this.ReactiveData = {
    id: "ReactiveData",
    columns: [
      {
        title: "Platform",
        data: "platform"
      }, {
        title: "User Agent",
        data: "userAgent"
      }, {
        title: "Cookies Enables",
        data: 'cookieEnabled'
      }, {
        title: "Browser Language",
        data: "language"
      }, {
        title: "Browser Online",
        data: "onLine"
      }, {
        title: "Created",
        data: "createdAt"
      }
    ],
    subscription: "reactive",
    query: Session.get("reactive-query"),
    options: {
      order: [5, 'desc']
    }
  };
}

if (Meteor.isServer) {
  this.ReactiveData = {
    id: "ReactiveTable",
    subscription: "reactive",
    collection: Reactive
  };
  rowCount = 20;
  Reactive.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}

this.insertRow = function(i) {
  var navigator;
  if (Meteor.isServer) {
    navigator = {
      platform: "NodeJS",
      language: "en-us"
    };
  }
  if (Meteor.isClient) {
    navigator = _.pick(window.navigator, "cookieEnabled", "language", "onLine", "platform", 'userAgent', "systemLanguage");
    console.log("Inserting Row", navigator);
  }
  return Reactive.insert(_.extend(navigator, {
    createdAt: new Date()
  }));
};

this.insertRows = function(howManyRows) {
  var i, _i;
  for (i = _i = 1; 1 <= howManyRows ? _i <= howManyRows : _i >= howManyRows; i = 1 <= howManyRows ? ++_i : --_i) {
    insertRow(i);
  }
  return console.log("" + howManyRows + " rows inserted");
};

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Reactive.find().count() === 0) {
      console.log("Initializing " + rowCount + " rows");
      return insertRows(rowCount);
    }
  });
}
