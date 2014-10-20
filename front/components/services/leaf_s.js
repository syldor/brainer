'use strict';
angular.module('app.services', []).factory('_leaf', [
		function() {
			var _leaf = {
				//
				//Create a wms map on the 'divid' div
				'wms_map': function(divid, lon, lat, zoom) {
					var map = L.map(divid).setView([lon, lat], zoom);
					var map_options = {};
					//map_options.maxZoom = 12;
					map_options.minZoom = 6;
					map_options.attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
					map_options.opacity = 0.4;
					L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', map_options).addTo(map);
					L.control.scale().addTo(map);
					// var map_color = 'white'; 
					// var map_opacity = 0.8;

					// var provinces_style = {
					// 	    "color": '#838281',
					// 	    "weight": 1,
					// 	    "opacity": 1,
					// 	    "fillColor": map_color,
					// 	    "fillOpacity": map_opacity,
					// 	    "clickable": false
					// 	};
					// L.geoJson(provinces_borders, {style: provinces_style}).addTo(map);

					// var laos_style = {
					// 	    "color": 'black',
					// 	    "weight": 0.3,
					// 	    "opacity": 1,
					// 	    "fillColor": map_color,
					// 	    "fillOpacity": map_opacity,
					// 	    "clickable": false
					// 	};
					// L.geoJson(laos_borders, {style: laos_style}).addTo(map);

					return map;
					}

				}
				return _leaf;
		}
	]);
