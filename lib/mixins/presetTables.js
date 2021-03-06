DataTableMixins.PresetTables = {
  presetOptions: function() {
    var options, selector;
    selector = this.getSelector();
    if (selector === 'datatable-tasks') {
      options = {
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [5]
          }
        ]
      };
    }
    if (selector === 'datatable-invoices') {
      options = {
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [1, 6]
          }
        ],
        aaSorting: [[0, "desc"]]
      };
    }
    if (selector === 'datatable-selectable') {
      options = {
        sDom: "<\"datatable-header\"Tfl><\"datatable-scroll\"t><\"datatable-footer\"ip>",
        oTableTools: {
          sRowSelect: "multi",
          aButtons: [
            {
              sExtends: "collection",
              sButtonText: "Tools <span class='caret'></span>",
              sButtonClass: "btn btn-primary",
              aButtons: ["select_all", "select_none"]
            }
          ]
        }
      };
    }
    if (selector === 'datatable-media') {
      options = {
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0, 4]
          }
        ]
      };
    }
    if (selector === 'datatable-pager') {
      options = {
        sPaginationType: "two_button",
        oLanguage: {
          sSearch: "<span>Filter:</span> _INPUT_",
          sLengthMenu: "<span>Show entries:</span> _MENU_",
          oPaginate: {
            sNext: "Next →",
            sPrevious: "← Previous"
          }
        }
      };
    }
    if (selector === 'datatable-tools') {
      options = {
        sDom: "<\"datatable-header\"Tfl><\"datatable-scroll\"t><\"datatable-footer\"ip>",
        oTableTools: {
          sRowSelect: "single",
          sSwfPath: "static/swf/copy_csv_xls_pdf.swf",
          aButtons: [
            {
              sExtends: "copy",
              sButtonText: "Copy",
              sButtonClass: "btn"
            }, {
              sExtends: "print",
              sButtonText: "Print",
              sButtonClass: "btn"
            }, {
              sExtends: "collection",
              sButtonText: "Save <span class='caret'></span>",
              sButtonClass: "btn btn-primary",
              aButtons: ["csv", "xls", "pdf"]
            }
          ]
        }
      };
    }
    if (selector === 'datatable-custom-sort') {
      options = {
        aoColumnDefs: [
          {
            bSortable: false,
            aTargets: [0, 1]
          }
        ]
      };
    }
    return options;
  }
};
