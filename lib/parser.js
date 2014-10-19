var pg = require('pg');
var async = require('async');
var fs = require('fs');

parser = function(spec, my) {
	var _super = {};
	my = my || {};

	//
	// #### _public methods_
	//
	var display_upload;

	//
	// #### _private methods_
	//
	var csv_parser;
	
	var that = {};


	csv_parser = function(data, cb_) {
		var page = data.split('\n');
		var parsed_data = [];
		for (var p = 0 ; p < 20 ; p++) {
			var line = page[p].split(',');
			parsed_data.push(line);
		}
		return cb_(null, parsed_data);
	}



	//
	// ### display_upload
	// 
	// ```
	// @roadid {string} the id of the road
	// @cb_ {function(err, res)}
	// ```
	display_upload = function(file, cb_) {
		var parsed_data = [];
		fs.readFile(file, function(err, data) {
			if(err) {
				return cb_(err);
			}
			else {
				csv_parser(data.toString('utf8'), function(err, parsed_data) {
					if(err) {
						return cb_(err);
					}
					else {
						return cb_(null, parsed_data);
					}
				});
			}
		});
	};

	that.display_upload = display_upload;

	return that;

}

exports.parser = parser;

	
	








