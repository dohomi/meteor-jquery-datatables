Template.nestedTable.created = function() {};

Template.nestedTable.rendered = function() {};

Template.nestedTable.destroyed = function() {};

Template.nestedTable.events({
  "click td.details-control": function(event, template) {
    var component, row, tr;
    tr = event.currentTarget.parentElement;
    row = this.self.$.api().row(tr);
    if (row.child.isShown()) {
      row.child.hide();
      return $(tr).find(".details-control i").removeClass("icon-minus").addClass("icon-plus");
    } else {
      component = UI.renderWithData(Template.childTable, row.data()).render().toHTML();
      row.child(component).show();
      return $(tr).find(".details-control i").removeClass("icon-plus").addClass("icon-minus");
    }
  }
});

Template.nestedTable.pages = function() {
  return {
    columns: [
      {
        "class": "details-control",
        orderable: false,
        data: null,
        mRender: function() {
          return UI.renderWithData(Template.icon, {
            styles: "icon-plus"
          }).render().toHTML();
        }
      }, {
        title: "Route",
        data: "route"
      }, {
        title: "Path",
        data: "path"
      }, {
        title: "Controller",
        data: "controller",
        mRender: function(data, type, row) {
          return row.controller != null ? row.controller : row.controller = "null";
        }
      }, {
        title: "Title",
        data: "page.title",
        mRender: function(data, type, row) {
          var _base;
          return (_base = row.page).title != null ? _base.title : _base.title = "";
        }
      }, {
        title: "Subtitile",
        data: "page.subtitle",
        mRender: function(data, type, row) {
          var _base;
          return (_base = row.page).subtitle != null ? _base.subtitle : _base.subtitle = "";
        }
      }, {
        title: "External Route",
        data: "external",
        mRender: function(data, type, row) {
          return row.external != null ? row.external : row.external = "false";
        }
      }
    ],
    rows: Router.collection.find().fetch()
  };
};
