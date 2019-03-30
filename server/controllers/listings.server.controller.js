var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

var nodemailer = require('nodemailer');
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'GVKZERdxjQgdfTufq3zhGkRXm',
  consumer_secret:      'jImRS1xCQm3MF5qouJRtW3ifphfru8Hi9t1rKzstK9rHlEzIvx',
  access_token:         '2852289612-UmtNYPl8th35NqOQoH2Enpa45934bCvC084tGoo',
  access_token_secret:  '6VSUj0E88PTSmR1ma7FahSBIoVzWA26fW2LbClT8bBo76',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

var mongoose = require('mongoose'),
    Listing = require('../models/listings.server.model.js');




exports.send_email = function(req, res) {
	name = req.body.name;
	email = req.body.email;
	issues = req.body.issues;

	var mailOptions = {
		from: 'no.reply.5583to@gmail.com',
		to: 'williamjr@ufl.edu',
		subject: 'Issue Report',
		text: "RESPOND TO: " + email + '\n' + issues
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	res.send("OK");
}

exports.get_trending = function(req, res) {
	var num_topics = req.body.count;
	T.get('trends/place', { id: req.body.woeid }, function(err, data, response) {
		data = data[0].trends;
		var best_topics = []
		for (var i = 0; i < data.length; i++) {
			if (data[i].tweet_volume != null) {
				if (best_topics.length < num_topics) { // Initial topics
					best_topics.push(data[i]);
				} else {
					var worst = 0;
					for (var k = 1; k < num_topics; k++) { // Find the worst topic in best_topics
						if (best_topics[k].tweet_volume < best_topics[worst].tweet_volume) {
							worst = k;
						}
					}

					if (best_topics[worst].tweet_volume < data[i].tweet_volume) { // Remove the worst and insert data[i]
						best_topics.splice(worst, 1);
						best_topics.push(data[i]);
					}
				}
			}
		}
		res.send(best_topics);
	});
}

exports.get_topic_cards = function(req, res) {
	var num_topic_cards = 4;
	T.get('search/tweets', { q: req.body.trend_name, count: num_topic_cards }, function(err, data, response) {
		if (data.statuses == null) {
			res.status(400);
			res.send([]);
			return;
		}
		var html_list = [];
		recurse_get_topic_cards(data.statuses, html_list, res);
	});
}

function recurse_get_topic_cards(statuses, html_list, res) {
	if (statuses.length == 0) {
		res.send(html_list);
		return;
	}

	status = statuses.pop();
	var url = 'https://twitter.com/statuses/' + status.id_str;

	T.get('statuses/oembed', { id: status.id_str }, function(err, html, response) {
		html_list.push(html.html);
		recurse_get_topic_cards(statuses, html_list, res);
	});
}

exports.get_regions = function(req, res) {
	T.get('trends/available', function(err, data, response) {
		res.send(data);
	});
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(ip);
}

exports.validate_token = function(req, res) {
	var good = false;
	$.ajax({
		url: "https://oauth2.googleapis.com/tokeninfo",
		type: "GET",
		async: false,
		data: { id_token: req.body.id_token },

		success: function(data){
			if (data.aud == "1062776272507-cu3jrfvoh587svb9qrifs7fqkhhsc5rq.apps.googleusercontent.com") {
				res.send("OK");
				good = true;
			}
		}
	});

	if (!good) {
		res.status(400);
	}
}
