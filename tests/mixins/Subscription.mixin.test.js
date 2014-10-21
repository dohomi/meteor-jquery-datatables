Tinytest.add("jQuery DataTables Mixins - Subscription:Definition", function(test) {
  return test.notEqual(DataTableMixins.Subscription, void 0, "Expected DataTableMixins.Subscription to be defined on the client and server.");
});

Tinytest.add("jQuery DataTables Mixins - Subscription:prepareSubscription()", function(test) {
  var RowsTable;
  if (Meteor.isServer) {
    RowsTable = new DataTableComponent({
      subscription: "rows",
      collection: Reactive,
      query: function(component) {
        component.log("userId", this.userId);
        return {};
      }
    });
    return test.equal(RowsTable.id(), "rows", "On the server the subscription is the component id.");
  }
});

if (Meteor.isClient) {
  Tinytest.add("jQuery DataTables Mixins - Subscription:Rendered", function(test) {
    var $DOM, component, tI;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.notEqual(tI.setSubscriptionOptions, void 0, "On render setSubscriptionOptions() should be defined");
    test.equal(tI.subscriptionOptions, void 0, "On render setSubscriptionOptions() should not be defined");
    test.notEqual(tI.setSubscriptionHandle, void 0, "On render setSubscriptionHandle() should be defined");
    test.equal(tI.subscriptionHandle, void 0, "On render subscriptionHandle() should not be defined");
    test.notEqual(tI.setSubscriptionAutorun, void 0, "On render setSubscriptionAutorun() should be defined");
    return test.equal(tI.subscriptionAutorun, void 0, "On render subscriptionAutorun() should not be defined");
  });
  Tinytest.add("jQuery DataTables Mixins - Subscription:setSubscriptionOptions()", function(test) {
    var $DOM, component, options, tI;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    options = {
      skip: 0,
      limit: 10,
      sort: []
    };
    tI.tableState({
      iDisplayStart: options.skip,
      iDisplayLength: options.limit,
      sort: options.sort
    });
    tI.setSubscriptionOptions();
    test.notEqual(tI.subscriptionOptions, void 0, "After running set subscriptionOptions subscriptionOptions should be defined.");
    return test.equal(tI.subscriptionOptions(), options, "setSubscriptionOptions should parse the datatable options into a mongoDB options object.");
  });
}
