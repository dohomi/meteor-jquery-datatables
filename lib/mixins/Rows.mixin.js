DataTableMixins.Rows = {
  extended: function() {
    if (Meteor.isClient) {
      return this.include({
        prepareRows: function() {
          if (!this.data.rows) {
            this.data.rows = [];
          }
          return this.addGetterSetter("data", "rows");
        },
        getRows: function() {
          if (this.$) {
            return this.$().fnSettings().aoData || false;
          } else {
            return this.rows() || false;
          }
        },
        getRowIndex: function(_id) {
          var checkIndex, counter, index, row, rows, _i, _len;
          index = false;
          counter = 0;
          rows = this.getRows();
          checkIndex = function(row) {
            if (row._data._id === _id) {
              index = counter;
            }
            return counter++;
          };
          for (_i = 0, _len = rows.length; _i < _len; _i++) {
            row = rows[_i];
            checkIndex(row);
          }
          return index;
        }
      });
    }
  }
};
