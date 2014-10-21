DataTableMixins.Query = {
  extended: function() {
    this.include({
      prepareQuery: function() {
        if (this.subscription || Meteor.isServer) {
          if (!this.query) {
            this.data.query = {};
            return this.addGetterSetter("data", "query");
          }
        }
      }
    });
    if (Meteor.isClient) {
      return this.include({
        arrayToDictionary: function(array, key) {
          var dict, obj, _i, _len;
          dict = {};
          for (_i = 0, _len = array.length; _i < _len; _i++) {
            obj = array[_i];
            if (obj[key] != null) {
              dict[obj[key]] = obj;
            }
          }
          return dict;
        },
        setQuery: function(query) {
          if (this.subscription) {
            if (!this.query) {
              this.prepareQuery();
            }
            if (this.query() !== query) {
              this.query(query);
              return this.rendered();
            }
          }
        },
        prepareTableState: function() {
          if (this.subscription) {
            this.data.tableState = void 0;
            return this.addGetterSetter("data", "tableState");
          }
        },
        getDataProp: function(key, index, data) {
          key = "" + key + "_" + index;
          return data[key].value;
        },
        mapColumns: function(index, data) {
          return this.tableState().columns[this.getDataProp('mDataProp', index, data)] = {
            mDataProp: this.getDataProp('mDataProp', index, data),
            bRegex: this.getDataProp('bRegex', index, data),
            bSearchable: this.getDataProp('bSearchable', index, data),
            bSortable: this.getDataProp('bSortable', index, data),
            sSearch: this.getDataProp('sSearch', index, data)
          };
        },
        mapQuery: function(key, property, searchQuery) {
          var obj;
          if (property.bSearchable !== false) {
            obj = {};
            obj[key] = {
              $regex: this.tableState().sSearch,
              $options: 'i'
            };
            return searchQuery.$or.push(obj);
          }
        },
        mapSortOrder: function(sortIndex, data) {
          var propertyIndex, propertyName;
          sortIndex = sortIndex - 1;
          propertyIndex = this.getDataProp('iSortCol', sortIndex, data);
          propertyName = this.getDataProp('mDataProp', propertyIndex, data);
          switch (this.getDataProp('sSortDir', sortIndex, data)) {
            case 'asc':
              return this.tableState().sort[propertyName] = 1;
            case 'desc':
              return this.tableState().sort[propertyName] = -1;
          }
        },
        mapTableState: function(aoData) {
          var index, key, property, searchQuery, sortIndex, _i, _j, _ref, _ref1, _ref2, _results;
          aoData = this.arrayToDictionary(aoData, 'name');
          this.log('mapTableState:aoData', aoData);
          this.tableState({
            sEcho: aoData.sEcho.value || 1,
            bRegex: aoData.bRegex.value || false,
            columns: [],
            iColumns: aoData.iColumns.value || 0,
            iSortingCols: aoData.iSortingCols.value || 0,
            sColumns: aoData.sColumns.value || "",
            iDisplayLength: aoData.iDisplayLength.value || 10,
            iDisplayStart: aoData.iDisplayStart.value || 0,
            sSearch: aoData.sSearch.value || ""
          });
          for (index = _i = 0, _ref = this.tableState().iColumns - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
            this.mapColumns(index, aoData);
          }
          if (this.tableState().sSearch !== "") {
            searchQuery = {
              $or: []
            };
            _ref1 = this.tableState().columns;
            for (key in _ref1) {
              property = _ref1[key];
              this.mapQuery(key, property, searchQuery);
            }
            if (this.query() === {}) {
              this.tableState().query = searchQuery;
            } else {
              this.tableState().query = {
                $and: [this.query(), searchQuery]
              };
            }
          } else {
            this.tableState().query = this.query();
          }
          if (this.tableState().iSortingCols > 0) {
            this.tableState().sort = {};
            _results = [];
            for (sortIndex = _j = 1, _ref2 = this.tableState().iSortingCols; 1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; sortIndex = 1 <= _ref2 ? ++_j : --_j) {
              _results.push(this.mapSortOrder(sortIndex, aoData));
            }
            return _results;
          }
        }
      });
    }
  }
};
