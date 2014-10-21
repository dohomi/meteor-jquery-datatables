var rowCount;

rowCount = 100000;

this.Rows = new Meteor.Collection('rows');

Rows.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

this.insertRow = function (i) {
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
    return Rows.insert(_.extend(navigator, {
        createdAt: new Date()
    }));
};

this.insertRows = function (howManyRows) {
    var i, _i;
    for (i = _i = 1; 1 <= howManyRows ? _i <= howManyRows : _i >= howManyRows; i = 1 <= howManyRows ? ++_i : --_i) {
        insertRow(i);
    }
    return console.log("" + howManyRows + " rows inserted");
};

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Rows.find().count() === 0) {
            console.log("Initializing " + rowCount + " rows");
            return insertRows(rowCount);
        }
    });
}
