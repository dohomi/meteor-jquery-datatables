Package.describe({
  summary: "Sort, page, and filter millions of records. Reactively."
});

Package.on_use(function (api, where) {
  api.use([
    'underscore',
    'luma-component'
  ],[ 'client', 'server' ]);

  // for helpers
  api.use([
    'jquery',
    'ui',
    'templating',
    'spacebars'
  ], [ 'client' ]);

  api.export([
    'DataTableMixins',
    'DataTableComponent'
  ], ['client','server']);

  /* External Libraries */
  api.add_files([
    'vendor/DataTables-1.10.0/media/js/jquery.dataTables.min.js',
    'vendor/DataTables-1.10.0/extensions/ColVis/js/dataTables.colVis.min.js',
    'vendor/DataTables-1.10.0/extensions/ColReorder/js/dataTables.colReorder.min.js'
  ], ['client']);

  /* Mixins */
  api.add_files([
    'lib/mixins/Base.mixin.js',
    'lib/mixins/Collection.mixin.js',
    'lib/mixins/Columns.mixin.js',
    'lib/mixins/Publish.mixin.js',
    'lib/mixins/Query.mixin.js',
    'lib/mixins/Subscription.mixin.js',
    'lib/mixins/Rows.mixin.js'
  ], [ 'client', 'server' ]);

  /* Template */
  api.add_files([
    'lib/DataTables.html'
  ], [ 'client' ]);

  /* Component */
  api.add_files([
    'lib/DataTables.component.js'
  ], [ 'client', 'server']);
});

Package.on_test(function (api) {
  api.use([
    'coffeescript',
    'jquery-datatables',
    'tinytest',
    'test-helpers'
  ], ['client', 'server']);

  /* Fixtures */
  api.add_files([
    'tests/fixtures/ReactiveData.fixture.js',
    'tests/fixtures/StaticData.fixture.js',
    'tests/fixtures/Publish.fixture.js'
  ], [ 'client', 'server' ]);

  /* Component */
  api.add_files([
    'tests/DataTables.component.test.js'
  ], ['client', 'server']);

  /* Mixins */
  api.add_files([
    'tests/mixins/Base.mixin.test.js',
    'tests/mixins/Collection.mixin.test.js',
    'tests/mixins/Columns.mixin.test.js',
    'tests/mixins/Rows.mixin.test.js',
    'tests/mixins/Publish.mixin.test.js',
    'tests/mixins/Query.mixin.test.js',
    'tests/mixins/Subscription.mixin.test.js'
  ], [ 'client', 'server' ]);
});
