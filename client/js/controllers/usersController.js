angular.module('users').controller('UsersController', ['$scope', 'Users',
	function($scope, Users) {
		$scope.users = [];
		$scope.tweets = [];
		$scope.topics = [];

		$scope.search_user = function() {
			var query = $("#userSearchBar").val();

			$.ajax({
				url: "/search_user",
				type: "POST",
				data: {
					query: query
				},
				success: function(data){
					$scope.users = data;
					$scope.$apply();
				}
			});
		}

		$scope.search_tweet = function() {
			var query = {
				all_of_these_words: $('#allWord').val(),
				this_exact_phrase: $('#phrase').val(),
				any_of_these_words: $("#any_of_these_words").val(),
				none_of_these_words: $("#excludeWords").val(),
				these_hashtags: $("#hashtags").val(),
				written_in: $("#sel1").val(),
				from_these_accounts: $("#from_these_accounts").val(),
				to_these_accounts: $("#to_these_accounts").val(),
				mentioning_these_accounts: $("#mentioning_these_accounts").val(),
				since: $("#from").val(),
				until: $("#until").val(),
			};

			$.ajax({
				url: "/search_tweets",
				type: "POST",
				data: {
					query: query,
					count: 100
				},
				success: function(data) {
					$scope.tweets = data;
					console.log($scope.tweets);
					$scope.$apply();
				}
			});
		}

		$scope.user_click = function(url) {
			window.open(url, '_blank')
		}

		$scope.update_topics = function() {
			$.ajax({
				url: "/find_listing",
				type: "POST",
				data: { user_id: read_cookie().user_id },
				success: function(data) {
					console.log(data.woeid);

					$.ajax({
						url: "/get_trending",
						type: "POST",
						data: { woeid: data.woeid, count: 10 },
						success: function(data){
							var trend_data = data;

							for (var i = 0; i < trend_data.length; i ++) {
								$.ajax({
									url: "/get_topic_cards",
									type: "POST",
									data: {
										trend_name: trend_data[i].name,
										section: i
									},
									success: function(data){
										$scope.topics.push({
											statuses: data.statuses,
											name: trend_data[data.section].name,
										});

										if ($scope.topics.length == 10) {
											console.log($scope.topics);
											$scope.$apply();
											update_accordions();
										}
									}
								});
							}
						},
						error: function(err) {
							console.log("ERROR");
						}
					});
				},
				error: function() {
					console.log("Could not find user");
				}
			});
		}
	}
]);
