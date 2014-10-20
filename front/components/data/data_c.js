'use strict';

function DataCtrl($scope, $http, $filter, $location, $routeParams) {
  $scope.table_name = $routeParams.nid;
  $scope.charts_type = ['line', 'bar'];
  $scope.get_data = function() {
    $http({method: 'GET', url: 'http://localhost:3000/api/data/' + $scope.table_name}).
      success(function(data) {
        $scope.data = data.rows;
        $scope.x_header = data.fields[0].name;
        $scope.y_header = data.fields[1].name;
        $scope.graph_type = 'line';
        new Morris.Line({
          element: 'line',
          data: $scope.data,
          xkey: $scope.x_header,
          ykeys: [$scope.y_header],
          labels: [$scope.y_header]
        });
      //   $scope.graph_type = 'bar';
      //   Morris.Bar({
      //   element: 'bar',
      //     data: $scope.data,
      //     xkey: $scope.x_header,
      //     ykeys: [$scope.y_header],
      //     labels: [$scope.y_header]
      // });
    });
  }
  $scope.get_data();
}