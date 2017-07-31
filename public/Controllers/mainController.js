//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService','$window','$http',
    function (UserService,  $window, $http) {
    let self = this;
    UserService.initUser();
    //UserService.getHomeProducts();
    //self.top5 = UserService.top5;
    self.GetTopFive = function () {
        if(!self.top5){
            $http.get('items/getTopFive')
                .then(function (res) {
                    self.top5 = res.data;
                }),function (err) {
                return Promise.reject(err);
            }
        }
    }
    self.GetTopFive();
    self.isLoggedIn = UserService.isLoggedIn;
}]);

