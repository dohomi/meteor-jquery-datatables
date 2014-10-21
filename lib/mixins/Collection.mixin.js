DataTableMixins.Collection = {
  countCollection: Meteor.isClient ? new Meteor.Collection("datatable_count") : "datatable_count",
  collections: [],
  getCollection: function(string) {
    var collection, id, _ref;
    _ref = DataTableComponent.collections;
    for (id in _ref) {
      collection = _ref[id];
      if (collection instanceof Meteor.Collection) {
        if (collection._name === string) {
          return collection;
          break;
        }
      }
    }
    return void 0;
  },
  extended: function() {
    this.include({
      prepareCollection: function() {
        var collection;
        if (Meteor.isClient) {
          if (this.subscription) {
            collection = DataTableComponent.getCollection(this.id());
            this.log("collection", collection);
            if (collection) {
              this.data.collection = collection;
              this.log("collection:exists", collection);
            } else {
              this.data.collection = new Meteor.Collection(this.id());
              DataTableComponent.collections.push(this.data.collection);
              this.log("collection:created", this.data.collection);
            }
            this.addGetterSetter("data", "collection");
          }
        }
        if (Meteor.isServer) {
          if (!this.data.collection) {
            throw new Error("collection property is not defined");
          }
          return this.addGetterSetter("data", "collection");
        }
      },
      collectionName: function() {
        if (this.collection) {
          return this.collection()._name;
        } else {
          return false;
        }
      },
      prepareCountCollection: function() {
        if (this.subscription) {
          if (!this.countCollection) {
            this.data.countCollection = DataTableComponent.countCollection;
            return this.addGetterSetter("data", "countCollection");
          }
        }
      }
    });
    if (Meteor.isClient) {
      return this.include({
        getCount: function(collectionName) {
          var countDoc;
          if (this.subscription) {
            countDoc = this.countCollection().findOne(collectionName);
            if (countDoc && "count" in countDoc) {
              return countDoc.count;
            } else {
              return 0;
            }
          }
        },
        totalCount: function() {
          return this.getCount(this.collectionName());
        },
        filteredCount: function() {
          return this.getCount("" + (this.collectionName()) + "_filtered");
        }
      });
    }
  }
};
