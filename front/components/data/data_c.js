'use strict';

function DataCtrl($scope, $http, $filter, $location, _config, $routeParams) {
  $scope.table_name = $routeParams.nid;
  $scope.get_tables_list = function() {
    $http({method: 'GET', url: _config.api_url() + '/data/' + $scope.table_name}).
      success(function(data) {
        $scope.data = data;
        console.log(data);
    });
  }
  $scope.get_tables_list();
}