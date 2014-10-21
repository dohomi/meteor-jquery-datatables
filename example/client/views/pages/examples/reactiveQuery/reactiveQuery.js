Template.reactiveQuery.rendered = function() {
  return $("#filter-created").uniform();
};

Template.reactiveQuery.events({
  "click .add-row": function(event, template) {
    return insertRow();
  },
  "change #filter-platform": function(event, template) {
    var $in, filter, query;
    query = Session.get("reactive-query");
    if (_.isArray(event.val) && event.val.length > 0) {
      $in = [];
      event.val.forEach(function(val) {
        return $in.push(val);
      });
      filter = {
        platform: {
          $in: $in
        }
      };
      _.extend(query, filter);
    } else {
      delete query.platform;
    }
    console.log(query);
    return Session.set("reactive-query", query);
  },
  "keyup #filter-user-agent": _.debounce(function(event, template) {
    var filter, query;
    query = Session.get("reactive-query");
    if (event.target.value) {
      filter = {
        userAgent: {
          $regex: event.target.value,
          $options: "i"
        }
      };
      _.extend(query, filter);
    } else {
      delete query.userAgent;
    }
    return Session.set("reactive-query", query);
  }, 300),
  "change #filter-cookie-enabled": function(event, template) {
    var filter, query, val;
    query = Session.get("reactive-query");
    if (event.val) {
      if (event.val === "true") {
        val = true;
      }
      if (event.val === "false") {
        val = false;
      }
      filter = {
        cookieEnabled: val
      };
      _.extend(query, filter);
    } else {
      delete query.cookieEnabled;
    }
    return Session.set("reactive-query", query);
  },
  "change #filter-created": function(event, template) {
    var filter, query;
    query = Session.get("reactive-query");
    if (event.target.checked) {
      filter = {
        createdAt: {
          $gte: moment().startOf("day").toDate()
        }
      };
      _.extend(query, filter);
    } else {
      delete query.createdAt;
    }
    return Session.set("reactive-query", query);
  }
});

Template.reactiveQuery.helpers({
  filterPlatformOptions: function() {
    return {
      placeholder: "Filter Platforms..."
    };
  },
  selectOptions: function() {
    return {
      allowClear: true
    };
  },
  reactiveQuery: function() {
    return Session.get("reactive-query");
  }
});
