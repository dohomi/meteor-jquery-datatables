Template.colVis.events({
  "click .ColVis_Button": function() {
    return $(".ColVis_collection li label input").uniform();
  }
});

Template.colVis.options = {
  order: [5, 'desc'],
  dom: "<\"datatable-header\"flC><\"datatable-scroll\"rt><\"datatable-footer\"ip>"
};
