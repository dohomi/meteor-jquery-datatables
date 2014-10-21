this.PublishStub = (function() {
  function PublishStub() {}

  PublishStub.collection = [];

  PublishStub.added = function(collection, id, fields) {
    return PublishStub.collection[id] = fields;
  };

  PublishStub.changed = function(collection, id, fields) {
    return _.extend(PublishStub.collection[id], fields);
  };

  PublishStub.removed = function(collection, id) {
    if (PublishStub.collection[id]) {
      return delete PublishStub.collection[id];
    }
  };

  return PublishStub;

})();
