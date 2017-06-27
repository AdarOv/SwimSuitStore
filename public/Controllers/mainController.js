//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','$window','$http',
    function (UserService,  $window, $http) {
    let vm = this;
    vm.userService = UserService;
}]);

