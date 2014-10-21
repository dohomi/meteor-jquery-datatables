DataTableMixins.Subscription = {
  extended: function() {
    this.include({
      prepareSubscription: function() {
        if (Meteor.isServer) {
          this.data.id = this.data.subscription;
          return this.addGetterSetter("data", "id");
        }
      }
    });
    if (Meteor.isClient) {
      return this.include({
        setSubscriptionOptions: function() {
          var options;
          if (!this.subscriptionOptions) {
            this.data.subscriptionOptions = void 0;
            this.addGetterSetter("data", "subscriptionOptions");
          }
          options = {
            skip: this.tableState().iDisplayStart,
            limit: this.tableState().iDisplayLength,
            sort: this.tableState().sort
          };
          this.subscriptionOptions(options);
          return this.log("subscriptionOptions", this.subscriptionOptions());
        },
        setSubscriptionHandle: function() {
          if (this.subscriptionHandle && this.subscriptionHandle().stop) {
            this.subscriptionHandle().stop();
          } else {
            this.data.subscriptionHandle = void 0;
            this.addGetterSetter("data", "subscriptionHandle");
          }
          this.subscriptionHandle(Meteor.subscribe(this.subscription(), this.collectionName(), this.query(), this.tableState().query, this.subscriptionOptions()));
          return this.log("subscriptionHandle", this.subscriptionHandle());
        },
        setSubscriptionAutorun: function(fnCallback) {
          Match.test(fnCallback, Object);
          if (this.subscriptionAutorun && this.subscriptionAutorun().stop) {
            this.subscriptionAutorun().stop();
          } else {
            this.data.subscriptionAutorun = void 0;
            this.addGetterSetter("data", "subscriptionAutorun");
          }
          this.subscriptionAutorun(Deps.autorun((function(_this) {
            return function() {
              var aaData, cursorOptions;
              if (_this.subscriptionHandle && _this.subscriptionHandle().ready()) {
                _this.log('fnServerdData:handle:ready', _this.subscriptionHandle().ready());
                cursorOptions = {
                  skip: 0
                };
                cursorOptions.limit = _this.tableState().iDisplayLength || 10;
                if (_this.tableState().sort) {
                  cursorOptions.sort = _this.tableState().sort;
                }
                if (!_this.cursor) {
                  _this.data.cursor = void 0;
                  _this.addGetterSetter("data", "cursor");
                }
                _this.cursor(_this.collection().find(_this.tableState().query, cursorOptions));
                aaData = _this.cursor().fetch();
                _this.log('fnServerData:aaData', aaData);
                return fnCallback({
                  sEcho: _this.tableState().sEcho,
                  iTotalRecords: _this.totalCount(),
                  iTotalDisplayRecords: _this.filteredCount(),
                  aaData: aaData
                });
              }
            };
          })(this)));
          return this.log("subscriptionAutorun", this.subscriptionAutorun());
        }
      });
    }
  }
};
