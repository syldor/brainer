
var pg = require('pg');
var async = require('async');

orm = function(spec, my) {
	var _super = {};
	my = my || {};

	//
	// #### _public methods_
	//
	var db_query;

	//
	// #### _private methods_
	//


	var that = {};

	//
	// ### db_query
	// This function returns an array of objects of the form {linkid: 'A', mstat: 35000}.
	// This array represents the all set of Links for a given Road ID, and for each Link, it
	// provides the higher Stat1, called `mstat`.
	// The array is ordered by alphabetical order of `linkid`.
	// ```
	// @roadid {string} the id of the road
	// @cb_ {function(err, res)}
	// ```
	db_query = function(conString, query, cb_) {
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				return cb_(err);
			}
			else {
				client.query(query, function(err, result) {
					client.end();
					if(err) {
						return cb_(err);
					}
					else {
						return cb_(null, result);
					}
				});
			}
		});
	};

	that.db_query = db_query;

	return that;

}

exports.orm = orm;

	
	








