'use strict';
angular.module('app.services', []).factory('_config', ['$location', function($location) {
			var _config = {
				//
				'api_url': function() {
					var url;
					if($location.host()) {
						url = 'http://' + $location.host() + ':' + $location.port() + '/api';
					}
					else {
						url = 'http://localhost:3000/api';
					}
					return url;
				}

				}
				return _config;
		}
	]);
