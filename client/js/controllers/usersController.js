angular.module('users').controller('UsersController', ['$scope', 'Users',
	function($scope, Users) {
		$scope.users = [];
		$scope.tweets = [];

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
				from: $("from").val(),
				to: $("to").val(),
			};

			$.ajax({
				url: "/search_tweets",
				type: "POST",
				data: {
					query: query,
					count: 1
				},
				success: function(data){
					$scope.tweets = data;
					$scope.$apply();
				}
			});
		}

		$scope.user_click = function(url) {
			window.open(url, '_blank')
		}
	}
]);
