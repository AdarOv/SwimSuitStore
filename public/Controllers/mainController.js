//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','$window','$http',
    function (UserService,  $window, $http) {
    let self = this;
    UserService.getHomeProducts();
}]);

