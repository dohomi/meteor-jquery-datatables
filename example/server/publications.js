var RowsTable;

RowsTable = new DataTableComponent({
  subscription: "rows",
  collection: Rows,
  debug: "userId",
  query: function(component) {
    component.log("userId", this.userId);
    return {};
  }
});

RowsTable.publish();

Meteor.startup(function() {
  Rows._ensureIndex({
    _id: 1
  }, {
    unique: 1
  });
  Rows._ensureIndex({
    'cookieEnabled': 1
  });
  Rows._ensureIndex({
    'language': 1
  });
  Rows._ensureIndex({
    'onLine': 1
  });
  Rows._ensureIndex({
    'platform': 1
  });
  Rows._ensureIndex({
    'userAgent': 1
  });
  Rows._ensureIndex({
    'systemLanguage': 1
  });
  return Rows._ensureIndex({
    createdAt: 1
  });
});
