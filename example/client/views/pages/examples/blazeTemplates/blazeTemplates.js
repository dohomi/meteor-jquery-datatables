Template.blazeTemplates.pages = function() {
  return {
    columns: [
      {
        title: "Route",
        data: "route"
      }, {
        title: "Path",
        data: "path",
        defaultContent: "null",
        mRender: function(data, type, row) {
          var component;
          component = UI.renderWithData(Template.exampleLinkTemplate, {
            href: row.path,
            anchor: row.page.title,
            title: row.page.subtitle,
            target: "_blank"
          });
          return component.render().toHTML();
        }
      }, {
        title: "Controller",
        data: "controller",
        mRender: function(data, type, row) {
          var component;
          component = UI.renderWithData(Template.exampleLabelTemplate, {
            label: row.controller || "null",
            "class": row.controller ? "label-info" : "label-warning"
          });
          return component.render().toHTML();
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
          var component;
          component = UI.renderWithData(Template.exampleLabelTemplate, {
            label: row.external || "false",
            "class": row.external ? "label-success" : "label-danger"
          });
          return component.render().toHTML();
        }
      }
    ],
    rows: Router.collection.find().fetch()
  };
};
