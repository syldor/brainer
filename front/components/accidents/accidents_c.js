'use strict';

function AccidentsCtrl($scope, $http, $filter, _leaf) {

	/****************************************************************************/
  /*                            STYLING                                       */
  /****************************************************************************/


  $scope.get_color = function(highway) {
    return highway == 'primary'   ? '#FFFF00': 
           highway == 'secondary' ? 'white':
           highway == 'tertiary'   ? '#FFFF00':
           highway == 'Rural'      ? '#D08400':
                                       'orange';
  };

  $scope.get_color_edge = function(highway) {
    return highway == 'primary'   ? '#FF0000': 
           highway == 'secondary' ? '#FF0000':
           highway == 'tertiary'   ? 'grey':
           highway == 'Rural'      ? 'grey':
                                       'orange';
  };

  $scope.get_width = function(highway) {
    var x = 0.5;
    return highway == 'primary'   ? 2.5 + x:
           highway == 'secondary' ? 2.5 + x:
           highway == 'district'   ? 2.5 + x:
           highway == 'Rural'      ? 2.5 + x:
                                       2.5 + x;
  }
  
  $scope.get_width_edge = function(highway) {
    return highway == 'primary'   ? $scope.get_width(highway) + 2:
           highway == 'secondary' ? $scope.get_width(highway) + 1.7:
           highway == 'tertiary'   ? $scope.get_width(highway) + 2:
           highway == 'Rural'      ? $scope.get_width(highway) + 1:
                                       1.5;
  }


  $scope.styling = function(feature) {
    if(feature.properties.type == 'inside') {
      return {
        color: $scope.get_color(feature.properties.highway),
        weight: $scope.get_width(feature.properties.highway),
        opacity: 1
      };
    }
    else {
        return {
          color: $scope.get_color_edge(feature.properties.highway),
          weight: $scope.get_width_edge(feature.properties.highway),
          opacity: 1,
          "clickable": false
        };
    }
  }


  var roads_inside = roads;
  var roads_outside = roads;

  for(var p = 0 ; p < roads.features.length ; p++ ) {
  	roads_outside.features[p].properties.type = 'outside';
  }

	$scope.map = _leaf.wms_map('accidents_map',  18.35, 104.07, 7);

  $scope.roads_edge_layer = L.geoJson(roads_outside, {
    style: $scope.styling
  }).addTo($scope.map);

  for(var p = 0 ; p < roads.features.length ; p++ ) {
  	roads_inside.features[p].properties.type = 'inside';
  }

  $scope.roads_inside_layer = L.geoJson(roads_inside, {
    style: $scope.styling
  }).addTo($scope.map);

  $scope.styling_accidents = function(feature) {
  	var radius_size = (feature.properties.damages < 30         ? 6:
  										 30 <= feature.properties.damages < 60   ? 12:
  										 60 <= feature.properties.damages < 90   ? 18:
  										 90 <= feature.properties.damages < 120  ? 24:
  																												       30);
	  return {
        radius: radius_size,
        fillColor: 'red',
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8,
        zIndex: 1000
    }  
  };

  $scope.accidents_layer = L.geoJson(accidents_2005, {
    onEachFeature: $scope.onEachCity,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, $scope.styling_accidents(feature));
    }
  }).addTo($scope.map);

  $scope.accidents_layer.on('click', function(e) {
  	$scope.$apply(function() {
  		$scope.accidents_data = e.layer.feature.properties;
  	})
  });

}