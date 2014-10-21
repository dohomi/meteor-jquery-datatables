Tinytest.add("jQuery DataTables Mixins - Rows:Definition", function(test) {
  return test.notEqual(DataTableMixins.Rows, void 0, "Expected DataTableMixins.Rows to be defined on the client and server.");
});

if (Meteor.isClient) {
  Tinytest.add("jQuery DataTables Mixins - Rows:Rendered", function(test) {
    var $DOM, component, tI;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.notEqual(tI.rows, void 0, "Component should have a rows method defined.");
    return test.equal(_.isArray(tI.rows()), true, "Calling the rows method should return an array of rows or an empty array.");
  });
}
