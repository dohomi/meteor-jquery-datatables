DataTableMixins.Publish = {
  extended: function() {
    if (Meteor.isServer) {
      return this.include({
        updateCount: function(args, added) {
          var component, filtered, total;
          if (added == null) {
            added = false;
          }
          component = this;
          if (args.initialized) {
            total = component.collection().find(args.baseQuery).count();
            component.log("" + (component.subscription()) + ":count:total", total);
            filtered = component.collection().find(args.filteredQuery).count();
            component.log("" + (component.subscription()) + ":count:filtered", filtered);
            if (added) {
              args.publish.added(component.countCollection(), args.collectionName, {
                count: total
              });
              return args.publish.added(component.countCollection(), "" + args.collectionName + "_filtered", {
                count: filtered
              });
            } else {
              args.publish.changed(component.countCollection(), args.collectionName, {
                count: total
              });
              return args.publish.changed(component.countCollection(), "" + args.collectionName + "_filtered", {
                count: filtered
              });
            }
          }
        },
        observer: function(args) {
          var component;
          component = this;
          return this.collection().find(args.filteredQuery, args.options).observe({
            addedAt: function(doc, index, before) {
              component.updateCount(args);
              args.publish.added(args.collectionName, doc._id, doc);
              args.publish.added(component.collection()._name, doc._id, doc);
              return component.log("" + (component.subscription()) + ":added", doc._id);
            },
            changedAt: function(newDoc, oldDoc, index) {
              component.updateCount(args);
              args.publish.changed(args.collectionName, newDoc._id, newDoc);
              args.publish.changed(component.collection()._name, newDoc._id, newDoc);
              return component.log("" + (component.subscription()) + ":changed", newDoc._id);
            },
            removedAt: function(doc, index) {
              component.updateCount(args);
              args.publish.removed(args.collectionName, doc._id);
              args.publish.removed(component.collection()._name, doc._id);
              return component.log("" + (component.subscription()) + ":removed", doc._id);
            }
          });
        },
        publish: function() {
          var component;
          component = this;
          return Meteor.publish(component.subscription(), function(collectionName, baseQuery, filteredQuery, options) {
            var args, countArgs, countHandle, handle, lastPage, query, queryMethod;
            Match.test(baseQuery, Object);
            Match.test(filteredQuery, Object);
            Match.test(options, Object);
            component.log("" + (component.subscription()) + ":query:base", baseQuery);
            component.log("" + (component.subscription()) + ":query:filtered", filteredQuery);
            component.log("" + (component.subscription()) + ":options", options);
            if (_.isFunction(component.query())) {
              queryMethod = _.bind(component.query(), this);
              query = queryMethod(component);
            } else {
              query = component.query();
            }
            baseQuery = {
              $and: [query, baseQuery]
            };
            filteredQuery = {
              $and: [query, baseQuery]
            };
            args = {
              publish: this,
              initialized: false,
              collectionName: collectionName,
              baseQuery: baseQuery,
              filteredQuery: filteredQuery,
              options: options
            };
            handle = component.observer(args);
            args.initialized = true;
            component.updateCount(args, true);
            args.publish.ready();
            lastPage = component.collection().find(args.filteredQuery).count() - args.options.limit;
            if (lastPage > 0) {
              countArgs = _.clone(args);
              countArgs.initialized = false;
              countArgs.options.skip = lastPage;
              countHandle = component.collection().find(countArgs.filteredQuery, countArgs.options).observe({
                addedAt: function() {
                  return component.updateCount(countArgs);
                },
                changedAt: function() {
                  return component.updateCount(countArgs);
                },
                removedAt: function() {
                  return component.updateCount(countArgs);
                }
              });
              countArgs.initialized = true;
            }
            return args.publish.onStop(function() {
              handle.stop();
              if (countHandle) {
                return countHandle.stop();
              }
            });
          });
        }
      });
    }
  }
};
