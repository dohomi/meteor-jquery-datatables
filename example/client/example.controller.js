var __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

this.ExampleController = (function (_super) {
    __extends(ExampleController, _super);

    function ExampleController() {
        return ExampleController.__super__.constructor.apply(this, arguments);
    }

    ExampleController.prototype.onBeforeAction = function () {
        Session.set("reactive-query", {});
        return ExampleController.__super__.onBeforeAction.apply(this, arguments);
    };

    ExampleController.prototype.data = function () {
        this.data.reactiveQuery = Session.get("reactive-query");
        this.data.rows = {
            columns: [
                {
                    title: "Platform",
                    data: "platform"
                }, {
                    title: "User Agent",
                    data: "userAgent"
                }, {
                    title: "Cookies Enables",
                    data: 'cookieEnabled'
                }, {
                    title: "Browser Language",
                    data: "language"
                }, {
                    title: "Browser Online",
                    data: "onLine"
                }, {
                    title: "Created",
                    data: "createdAt",
                    mRender: function (data, type, row) {
                        return moment(row.createdAt).fromNow();
                    }
                }
            ],
            subscription: "rows",
            query: Session.get("reactive-query"),
            debug: "all",
            options: {
                order: [5, 'desc']
            }
        };
        this.data["package"] = {
            name: "jQuery DataTables",
            description: "Sort, page, and filter millions of records. Reactively.",
            owner: "LumaPictures",
            repo: "meteor-jquery-datatables"
        };
        return ExampleController.__super__.data.apply(this, arguments);
    };

    return ExampleController;

})(PackageLayoutController);
