var ColumnDrillDownFilters;

ColumnDrillDownFilters = {
  initializeColumnDrilldownFilters: function() {
    this.prepareColumnDrilldownFilterContainer();
    return this.getColumnDrilldownFilterContainer();
  },
  prepareColumnDrilldownFilterContainer: function() {
    var container;
    container = UI.renderWithData(Template.dataTableColumnDrilldownFilterContainer, this.getData());
    return this.setColumnDrilldownFilterContainer(container);
  },
  setColumnDrilldownFilterContainer: function(markup) {
    Match.test(markup, String);
    return this.getTemplateInstance().$ColumnDrilldownFilterContainer = $(markup);
  },
  getColumnDrilldownFilterContainer: function() {
    if (this.getTemplateInstance().$ColumnDrilldownFilterContainer) {
      return this.getTemplateInstance().$ColumnDrilldownFilterContainer[0].dom.members[1] || false;
    }
  }
};

Template.dataTable = _.extend(Template.dataTable, ColumnDrillDownFilters);

Template.dataTable.events({
  'click .drilldown.column-filter-widget': function(event, template) {
    console.log(template);
    return console.log(event);
  }
});

$.fn.dataTableExt.aoFeatures.push({
  fnInit: function(oSettings) {
    var component;
    component = oSettings.oInstance.fnGetComponent();
    return component.initializeColumnDrilldownFilters();
  },
  cFeature: "W",
  sFeature: "ColumnDrilldownFilters"
});

Template.dataTableColumnDrilldownFilterContainer.created = function() {
  return console.log(this);
};

Template.dataTableColumnDrilldownFilterContainer.filterableColumns = function() {
  return [
    {
      name: 'test'
    }, {
      name: 'test2'
    }
  ];
};
