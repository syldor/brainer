'use strict';

function TablesCtrl($scope, $http, $filter, $location, _config) {
  $scope.get_tables_list = function() {
    $http({method: 'GET', url: _config.api_url() + '/tables/list'}).
      success(function(data) {
        $scope.data = data;
  	});
  }

  $scope.insert_data = function() {
  	$location.path('insert');
  }

  $scope.see_data = function(table_name) {
    $location.path('data/' + table_name);
  }

  $scope.get_tables_list();
}