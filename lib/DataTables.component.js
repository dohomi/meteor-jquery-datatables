var DataTableComponent,
    __hasProp = {}.hasOwnProperty,
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

DataTableComponent = (function (_super) {
    __extends(DataTableComponent, _super);

    DataTableComponent.prototype.__name__ = "DataTable";

    DataTableComponent.extend(DataTableMixins.Base);

    DataTableComponent.extend(DataTableMixins.Collection);

    DataTableComponent.extend(DataTableMixins.Query);

    DataTableComponent.extend(DataTableMixins.Subscription);

    if (Meteor.isClient) {
        DataTableComponent.extend(DataTableMixins.Columns);
        DataTableComponent.extend(DataTableMixins.Rows);
        DataTableComponent.extend(ComponentMixins.ChooseTemplate);
    }

    if (Meteor.isServer) {
        DataTableComponent.extend(DataTableMixins.Publish);
    }

    function DataTableComponent(context) {
        if (context == null) {
            context = {};
        }
        DataTableComponent.__super__.constructor.apply(this, arguments);
        this.prepareSubscription();
        this.prepareCollection();
        this.prepareCountCollection();
        this.prepareQuery();
        if (Meteor.isClient) {
            this.prepareColumns();
            this.prepareRows();
            this.prepareOptions();
            this.prepareTableState();
        }
    }

    DataTableComponent.prototype.rendered = function () {
        if (Meteor.isClient) {
            this.$ = $("" + (this.selector()) + " table").dataTable(this.options());
            this.log("$", this.$);
            this.initializeFilterPlaceholder();
            this.initializeDisplayLength();
        }
        return DataTableComponent.__super__.rendered.apply(this, arguments);
    };

    DataTableComponent.prototype.destroyed = function () {
        if (Meteor.isClient) {
            if ($(".ColVis_collection")) {
                $(".ColVis_collection").remove();
            }
            if (this.subscriptionAutorun && this.subscriptionAutorun().stop) {
                this.subscriptionAutorun().stop();
            }
        }
        return DataTableComponent.__super__.destroyed.apply(this, arguments);
    };

    DataTableComponent.prototype.fnServerData = function (sSource, aoData, fnCallback, oSettings) {
        if (Meteor.isClient) {
            this.mapTableState(aoData);
            this.setSubscriptionOptions();
            this.setSubscriptionHandle();
            return this.setSubscriptionAutorun(fnCallback);
        } else {
            throw new Error("fnServerData can only be called from the client.");
        }
    };

    return DataTableComponent;

})(Component);

if (Meteor.isClient) {
    Template.DataTable.created = function () {
        return new DataTableComponent(this);
    };
    $.fn.dataTableExt.oApi.fnGetComponent = function () {
        var oSettings;
        oSettings = this.fnSettings();
        if (oSettings) {
            if (oSettings.oInit) {
                return oSettings.oInit.component || false;
            }
        }
        throw new Error("DataTable Blaze component not instantiated");
    };
}
