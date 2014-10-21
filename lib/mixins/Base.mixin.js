
/*
 ```coffeescript
 class Whatever extends Component
 @extend DataTableMixins.Base
 ```
 */

/*
 ```coffeescript
 class Whatever extends Component
 @extend DataTableMixins.Base
 constructor: ( context = {} ) ->
 @data.instanceProperty = @instanceProperty
 super
 ```
 */
var DataTableMixins;

DataTableMixins = {
  Base: {
    extended: function() {
      if (Meteor.isServer) {
        this.include({
          defaults: {}
        });
      }
      if (Meteor.isClient) {
        return this.include({
          defaults: {
            destroy: true,
            jQueryUI: false,
            autoWidth: true,
            deferRender: false,
            scrollCollapse: false,
            paginationType: "full_numbers",
            dom: "<\"datatable-header\"fl><\"datatable-scroll\"rt><\"datatable-footer\"ip>",
            language: {
              search: "_INPUT_",
              lengthMenu: "<span>Show :</span> _MENU_",
              processing: "Loading",
              paginate: {
                first: "First",
                last: "Last",
                next: ">",
                previous: "<"
              }
            }
          },
          prepareOptions: function() {
            if (!this.options) {
              this.data.options = {};
              this.addGetterSetter("data", "options");
            }
            this.options().component = this;
            if (!this.isDomSource()) {
              this.options().data = this.rows();
              this.options().columns = this.columns ? this.columns() : [];
              if (this.collection && this.query) {
                this.options().serverSide = true;
                this.options().processing = true;
                this.options().ajaxSource = "useful?";
                this.options().serverData = _.debounce(_.bind(this.fnServerData, this), 300);
              }
            }
            return this.options(_.defaults(this.options(), this.defaults));
          },
          initializeDisplayLength: function() {
            if ($().select2 && $("" + (this.selector()) + " .dataTables_length select")) {
              return $("" + (this.selector()) + " .dataTables_length select").select2({
                minimumResultsForSearch: "-1"
              });
            }
          },
          initializeFilterPlaceholder: function() {
            if ($("" + (this.selector()) + " .dataTables_filter input[type=text]")) {
              return $("" + (this.selector()) + " .dataTables_filter input[type=text]").attr("placeholder", "Type to filter...");
            }
          },
          initializeFooterFilter: function() {
            var self;
            if ($.keyup && $("." + (this.selector()) + " .dataTables_wrapper tfoot input")) {
              self = this;
              return $("." + (this.selector()) + " .dataTables_wrapper tfoot input").keyup(function() {
                var target;
                target = this;
                return self.getDataTable().fnFilter(target.value, $("." + (self.getSelector()) + " .dataTables_wrapper tfoot input").index(target));
              });
            }
          },
          isDomSource: function() {
            if (this.dom) {
              return this.dom();
            } else {
              return false;
            }
          }
        });
      }
    }
  }
};
