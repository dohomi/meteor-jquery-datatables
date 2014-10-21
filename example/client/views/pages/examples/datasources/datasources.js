
/*
 ```html
 {{#dataTable selector="dom-source-datatable" domSource=true debug="all" }}
 {{> domSource }}
 {{/dataTable}}
 ```
 */
Template.domSource.routes = function() {
  return Router.collection.find();
};


/*
 ```html
 {{> dataTable
 selector=pages.selector
 columns=pages.columns
 rows=pages.rows
 }}
 ```
 */

Template.dataSources.pages = function() {
  return {
    columns: [
      {
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
    selector: "dataTable-pages",
    rows: Router.collection.find().fetch()
  };
};

Template.dataSources.events({
  "click .add-row": function(event, template) {
    return insertRow();
  }
});
