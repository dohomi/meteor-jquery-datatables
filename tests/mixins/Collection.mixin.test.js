Tinytest.add("jQuery DataTables Mixins - Collection:Definition", function(test) {
  test.notEqual(DataTableMixins.Collection, void 0, "Expected DataTableMixins.Collection to be defined on the client and server.");
  test.notEqual(DataTableComponent.countCollection, void 0, "DataTableComponent class should have a count collection defined on client and server.");
  test.equal(_.isArray(DataTableComponent.collections), true, "DataTableComponent class should have a collections array defined on the client and server.");
  return test.notEqual(DataTableComponent.getCollection, void 0, "DataTableComponent class should have a getCollection method defined on the client and server.");
});

Tinytest.add("jQuery DataTables Mixins - Collection:Rendered:Reactive", function(test) {
  var $DOM, component, component2, tI, tI2;
  if (Meteor.isClient) {
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.equal(tI.subscription(), ReactiveData.subscription, "Component with reactive datasouce should have a subscription defined that matches the subscription init option.");
    test.equal(tI.collection() instanceof Meteor.Collection, true, "Component with reactive datasource should have a collection defined.");
    test.equal(tI.collectionName(), ReactiveData.id, "Component with reactive datasource should have a collection defined that is named after the component id.");
    test.equal(tI.collection() instanceof Meteor.Collection, true, "Component with reactive datasource should have a count collection defined.");
    test.equal(tI.countCollection(), DataTableComponent.countCollection, "Component with reactive datasource should have a countCollection property defined that is equal to the class countCollection property.");
    test.equal(tI.totalCount(), 0, "Component with reactive datasource should be able to call totalCount() on the client.");
    test.equal(tI.filteredCount(), 0, "Component with reactive datasource should be able to call totalCount() on the client.");
    component2 = UI.renderWithData(Template.DataTable, ReactiveData);
    tI2 = component2.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component2, $DOM);
    test.equal(DataTableComponent.getCollection(ReactiveData.id), tI2.collection(), "DataTableComponent.getCollection should return a collection found by id if it is already created.");
    test.equal(tI2.collectionName(), tI.collectionName(), "Creating two components with identical ids should use the same collection.");
    test.equal(tI2.collection(), tI.collection(), "Creating two components with identical ids should use the same collection.");
  }
  if (Meteor.isServer) {
    return test.equal(_.isString(DataTableComponent.countCollection), true, "The DataTableComponent.countCollection property on the server should be the name of the countCollection");
  }
});

Tinytest.add("jQuery DataTables Mixins - Collection:Rendered:Static", function(test) {
  var $DOM, component, tI;
  if (Meteor.isClient) {
    component = UI.renderWithData(Template.DataTable, StaticData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.equal(tI.collection, void 0, "Static datatables should not have a collection defined.");
    test.equal(tI.collectionName(), false, "Static datatables should not have a collection defind.");
    return test.equal(tI.countCollection, void 0, "Static datatables should not have a count collection defined.");
  }
});
