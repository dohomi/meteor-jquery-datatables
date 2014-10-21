Tinytest.add("jQuery DataTables - Definition", function(test) {
  test.notEqual(DataTableComponent, void 0, "Expected DataTableComponent to be defined on the client and server.");
  test.notEqual(DataTableMixins, void 0, "Expected DataTableComponent to be defined on the client and server.");
  if (Meteor.isClient) {
    test.notEqual($().dataTable, void 0, "Expected DataTable jQuery plugin to be defined on the client.");
    return test.notEqual(Template.DataTable, void 0, "Expected Template.DataTable to be defined on the client.");
  }
});

Tinytest.add("jQuery DataTables - Constructor", function(test) {
  var component, tI;
  if (Meteor.isClient) {
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
  }
  if (Meteor.isServer) {
    tI = new DataTableComponent(ReactiveData);
  }
  test.equal(tI.__name__, "DataTable", "Class __name__ should be DataTable");
  test.notEqual(tI.id, void 0, "Component should have id method defined.");
  return test.equal(tI.id(), ReactiveData.id, "Component id should be equal the id passed in through constructor.");
});

if (Meteor.isClient) {
  Tinytest.add("jQuery DataTables - Rendered", function(test) {
    var $DOM, component, tI;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.notEqual(tI.$, void 0, "Component should have a jQuery node defined after being rendered.");
    test.notEqual(tI.selector, void 0, "Component should have selector method defined.");
    return test.equal(tI.selector(), "#" + ReactiveData.id, "Component selector should be based on the id passed in through constructor.");
  });
}

Tinytest.add("jQuery DataTables - fnServerData", function(test) {
  var $DOM, component, tI;
  if (Meteor.isClient) {
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.notEqual(tI.fnServerData, void 0, "All components should have an fnServerData method defined.");
    test.notEqual(tI.mapTableState, void 0, "fnServerData() expects @mapTableState() to be defined");
    test.notEqual(tI.setSubscriptionOptions, void 0, "fnServerData() expects @setSubscriptionOptions() to be defined");
    test.notEqual(tI.setSubscriptionHandle, void 0, "fnServerData() expects @setSubscriptionHandle() to be defined");
    test.notEqual(tI.setSubscriptionAutorun, void 0, "fnServerData() expects @setSubscriptionAutorun() to be defined");
  }
  if (Meteor.isServer) {
    return component = new DataTableComponent(ReactiveData);

    /*try
     component.fnServerData()
     catch error
     test.equal error.message, "fnServerData can only be called from the client.", "Calling fnServerData on the server should throw an error."
     */
  }
});
