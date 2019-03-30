// William Rodriguez

/* Dependencies */
var listings = require('../controllers/listings.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/send_email')
	.post(listings.send_email);

router.route('/get_trending')
	.post(listings.get_trending);

router.route('/get_topic_cards')
	.post(listings.get_topic_cards);

router.route('/get_regions')
	.get(listings.get_regions);

router.route('/update_listing')
	.post(listings.update_listing);

router.route('/find_listing')
	.post(listings.find_listing)
	
module.exports = router;
