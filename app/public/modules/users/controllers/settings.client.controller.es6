'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication', function ($scope, $http, $location, Users, Authentication) {
	$scope.user = Authentication.user;

	if (!$scope.user) $location.path('/');

	$scope.updateUserProfile = function (isValid) {
		if (isValid) {
			$scope.success = $scope.error = null;
			var user = new Users($scope.user);

			user.$update(function (response) {
				$scope.success = true;
				Authentication.user = response;
			}, function (response) {
				$scope.error = response.data.message;
			});
		} else {
			$scope.submitted = true;
		}
	};

	// Check if there are additional accounts
	$scope.hasConnectedAdditionalSocialAccounts = function (provider) {
		for (var i in $scope.user.additionalProvidersData) {
			return true;
		}

		return false;
	};

	// Check if provider is already in use with current user
	$scope.isConnectedSocialAccount = function (provider) {
		return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
	};

	// Remove a user social account
	$scope.removeUserSocialAccount = function (provider) {
		$scope.success = $scope.error = null;

		$http.delete('/users/accounts', {
			params: {
				provider: provider
			}
		}).success(function (response) {
			// If successful show success message and clear form
			$scope.success = true;
			$scope.user = Authentication.user = response;
		}).error(function (response) {
			$scope.error = response.message;
		});
	};
}]);