Tinytest.add("jQuery DataTables Mixins - Publish:Definition", function(test) {
  var component;
  test.notEqual(DataTableMixins.Publish, void 0, "Expected DataTableMixins.Publish to be defined on the client and server.");
  if (Meteor.isServer) {
    component = new DataTableComponent(ReactiveData);
    test.notEqual(component.publish, void 0, "Instantiated component should have a publish method.");
    test.notEqual(component.updateCount, void 0, "Instantiated component should have a updateCount method.");
    return test.notEqual(component.observer, void 0, "Instantiated component should have a observer method.");
  }
});

if (Meteor.isServer) {
  Tinytest.add("jQuery DataTables Mixins - Publish:updateCount( Object, Boolean )", function(test) {
    var args, component;
    args = {
      publish: PublishStub,
      initialized: false,
      collectionName: "DataTable-1",
      baseQuery: {},
      filteredQuery: {},
      options: {
        skip: 0,
        limit: 10,
        sort: {
          createdAt: -1
        }
      }
    };
    component = new DataTableComponent(ReactiveData);
    component.updateCount(args);
    test.equal(PublishStub.collection, [], "updateCount() should not add any counts until the publication has been initialized.");
    args.initialized = true;
    component.updateCount(args, true);
    test.equal(PublishStub.collection[args.collectionName].count, Reactive.find().count(), "calling updatCount after initialization will add a count document to the count collection.");
    test.equal(PublishStub.collection["" + args.collectionName + "_filtered"].count, Reactive.find().count(), "calling updatCount after initialization will add a filtered count document to the count collection.");
    return PublishStub.collection = [];
  });
  testAsyncMulti("jQuery DataTables Mixins - Publish:observer( Object )", [
    function(test, expect) {
      var args, cb, cbSync, component, doc, handle, id;
      args = {
        publish: PublishStub,
        initialized: false,
        collectionName: "DataTable-1",
        baseQuery: {},
        filteredQuery: {},
        options: {
          skip: 0,
          limit: 10,
          sort: {
            createdAt: -1
          }
        }
      };
      PublishStub.collection = [];
      component = new DataTableComponent(ReactiveData);
      handle = component.observer(args);
      test.equal(_.keys(PublishStub.collection).length, args.options.limit, "observer() should publish only a paginated subset to the client.");
      doc = {
        platform: "NodeJS",
        language: "en-us",
        createdAt: new Date()
      };
      id = Reactive.insert(doc);
      cb = expect(function() {
        test.equal(_.keys(PublishStub.collection).length, args.options.limit, "observer() should publish only a paginated subset to the client.");
        test.equal(_.isObject(PublishStub.collection[id]), true, "When a document is added to the collection and matches the query it should be published while maintaining the limit.");
        handle.stop();
        return PublishStub.collection = [];
      });
      cbSync = Meteor.bindEnvironment(cb);
      return setTimeout(cbSync, 100);
    }
  ]);
}
