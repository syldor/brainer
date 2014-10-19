var express = require('express');
var router = express.Router();

router.route('/tables/list')          .get(require('./tables.js').get_tables_list)
router.route('/data/:nid')			  .get(require('./tables.js').get_data);


module.exports = router;
