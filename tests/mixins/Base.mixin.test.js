Tinytest.add("jQuery DataTables Mixins - Base:Definition", function(test) {
  return test.notEqual(DataTableMixins.Base, void 0, "Expected DataTableMixins.Base to be defined on the client and server.");
});

Tinytest.add("jQuery DataTables Mixins - Base:Defaults", function(test) {
  var component, defaultOptions;
  if (Meteor.isClient) {
    component = UI.renderWithData(Template.DataTable, _.omit(ReactiveData, "options"));
    component = component.templateInstance;
  }
  if (Meteor.isServer) {
    component = new DataTableComponent(_.omit(ReactiveData, "options"));
    test.notEqual(component.defaults, void 0, "Component defaults should be set on the client.");
    test.equal(_.isObject(component.defaults()), true, "Calling the defaults method should returnt he defaults object.");
    defaultOptions = _.pick(component.options(), _.keys(component.defaults()));
    return test.equal(defaultOptions, component.defaults(), "Component with no options should have options set to defaults.");
  }
});

if (Meteor.isClient) {
  Tinytest.add("jQuery DataTables Mixins - Base:Rendered:Reactive", function(test) {
    var $DOM, component, tI;
    component = UI.renderWithData(Template.DataTable, ReactiveData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.equal(tI.options().data, [], "Component with reactive datasource should have an empty options.data array.");
    test.equal(_.isArray(tI.columns()), true, "Component with reactive datasource should have a columns array.");
    test.notEqual(tI.options().serverSide, void 0, "Component with reactive datasource should have severSide option defined.");
    test.notEqual(tI.options().processing, void 0, "Component with reactive datasource should have processing option defined.");
    test.notEqual(tI.options().ajaxSource, void 0, "Component with reactive datasource should have ajaxSource option defined.");
    return test.notEqual(tI.options().serverData, void 0, "Component with reactive datasource should have serverData option defined.");
  });
  Tinytest.add("jQuery DataTables Mixins - Base:Rendered:Static", function(test) {
    var $DOM, component, tI;
    component = UI.renderWithData(Template.DataTable, StaticData);
    tI = component.templateInstance;
    $DOM = $('<div id="parentNode"></div>');
    UI.insert(component, $DOM);
    test.equal(tI.options().data, StaticData.rows, "Component with static datasource should have an empty options.data array.");
    test.equal(_.isArray(tI.columns()), true, "Component with static datasource should have a columns array.");
    test.equal(tI.options().serverSide, void 0, "Component with static datasource should not have severSide option defined.");
    test.equal(tI.options().processing, void 0, "Component with static datasource should not have processing option defined.");
    test.equal(tI.options().ajaxSource, void 0, "Component with static datasource should not have ajaxSource option defined.");
    return test.equal(tI.options().serverData, void 0, "Component with static datasource should not have serverData option defined.");
  });
}
