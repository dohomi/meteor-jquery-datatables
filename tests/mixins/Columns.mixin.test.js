Tinytest.add("jQuery DataTables Mixins - Columns:Definition", function(test) {
  return test.notEqual(DataTableMixins.Columns, void 0, "Expected DataTableMixins.Columns to be defined on the client and server.");
});

if (Meteor.isClient) {
  Tinytest.add("jQuery DataTables Mixins - Columns:Rendered", function(test) {
    var $DOM, component, staticComponent, tI, tI2;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    staticComponent = UI.renderWithData(Template.DataTable, StaticData);
    tI2 = staticComponent.templateInstance;
    UI.insert(staticComponent, $DOM);
    test.notEqual(tI.columns, void 0, "Component should have a columns method defined.");
    test.equal(tI.columns().length, ReactiveData.columns.length, "Components columns arrary should be the same as initializer columns array with an extra id column.");
    return test.equal(tI.columns()[0].mRender({}, "", [
      {
        "platform": null
      }
    ]), "", "All columns have a default mRender function that returns an empty string.");
  });
}
