angular.module('fslogin', ['fsapi']);

angular.module('fslogin').factory('FSLoginModel', function(FSAuth, FSApi, $state){
	var m = {
		username: '',
		password: '',
		loading: false,
		login: login,
	};

	function login(){
		m.loading = true;
		FSApi.login(m.username, m.password).then(function(result){
			FSAuth.set_user(result.data);
			$state.go('home');
		}).finally(function(){
			m.loading = false;
		});
	}

	return m;
});

angular.module('fslogin').directive('fslogin', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'login/fslogin.html',
		controller: function($scope, FSLoginModel, FSAuth){
			$scope.m = FSLoginModel;
			$scope.auth = FSAuth;
		},
	};
});