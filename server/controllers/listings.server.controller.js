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

/* Dependencies */
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
	T.get('trends/place', { id: 1 }, function(err, data, response) {
		res.send(data[0].trends);
	});
}

exports.get_topic_cards = function(req, res) {
	var num_topic_cards = 4;
	T.get('search/tweets', { q: req.body.trend_name, count: 100 }, function(err, data, response) {
		var html_list = [];
		recurse_get_topic_cards(data.statuses.slice(0, num_topic_cards), html_list, res);
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
