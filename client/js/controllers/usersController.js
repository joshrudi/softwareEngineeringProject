angular.module('users').controller('UsersController', ['$scope', 'Users',
	function($scope, Users) {
		$scope.users = Users;
	}
]);
