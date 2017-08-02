//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','$window','$http','$rootScope','$location',
    function (UserService,  $window, $http, $rootScope, $location) {
    let self = this;
    UserService.getHomeProducts().then(function (res) {
        self.top5 = UserService.top5;
        self.newProducts = UserService.newProducts;
    });
    self.Go = function () {
        if(self.filter != '' && self.filter != 'search '){
            $rootScope.filter = self.filter;
            $location.path('/shop');
        }
    }
    self.user = UserService.userSer;
}]);

