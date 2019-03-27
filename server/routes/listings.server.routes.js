// William Rodriguez

/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/send_email')
	.post(listings.send_email);

module.exports = router;
