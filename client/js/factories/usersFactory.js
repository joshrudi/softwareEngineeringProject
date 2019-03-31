angular.module('users').factory('Users', function() {
	var users = [
		{
			name: "Paul",
			friends: 1,
			followers: 2,
			tweets: 10,
			retweets: 2,
			favorites: 1
		}
	];

	return users;
});
console.log("usersFactory.js running");
