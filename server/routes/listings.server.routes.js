// William Rodriguez

/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/send_email')
	.post(listings.send_email);

router.route('/get_trending')
	.get(listings.get_trending);

router.route('/get_topic_cards')
	.post(listings.get_topic_cards);

module.exports = router;
