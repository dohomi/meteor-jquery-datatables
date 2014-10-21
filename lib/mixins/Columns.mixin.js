DataTableMixins.Columns = {
  extended: function() {
    if (Meteor.isClient) {
      return this.include({
        prepareColumns: function() {
          var column, columns, _i, _len;
          if (!this.columns) {
            this.data.columns = void 0;
            this.addGetterSetter("data", "columns");
          }
          columns = this.columns() || [];
          for (_i = 0, _len = columns.length; _i < _len; _i++) {
            column = columns[_i];
            this.setDefaultCellValue(column);
          }
          return this.columns(columns);
        },
        setDefaultCellValue: function(column) {
          Match.test(column.data, String);
          Match.test(column.title, String);
          if (!column.mRender) {
            return column.mRender = function(data, type, row) {
              var _name;
              return row[_name = column.data] != null ? row[_name] : row[_name] = "";
            };
          }
        }
      });
    }
  }
};
