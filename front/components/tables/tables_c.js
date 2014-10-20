'use strict';

function TablesCtrl($scope, $http, $filter, $location) {
  $scope.acc = {};
  $scope.acc.name = 'accidents';
  $scope.acc.description = 'Map of the accidents in Lao PDR, 2005';

  $scope.spatial_data = [];
  $scope.spatial_data.push($scope.acc);

  $scope.get_tables_list = function() {
    $http({method: 'GET', url: 'http://localhost:3000/api/tables/list'}).
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

  $scope.see_spatial_data = function(table_name) {
    $location.path('spatial/' + table_name);
  }

  $scope.get_tables_list();
}