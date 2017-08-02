let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);
//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "Views/Home.html"
        })
        .when("/login", {
            templateUrl : "Views/Login.html",
            controller : "loginController"
        })
        .when("/register", {
            templateUrl : "Views/Register.html"
        })
        .when("/shop", {
            templateUrl : "Views/Shop.html"
        })
        .when("/cart", {
            templateUrl : "Views/Cart.html",
            controller : "cartController"
        })
        .otherwise({redirect: '/',
        });
}]);
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', 'localStorageService', '$rootScope',
    function($http, localStorageService, $rootScope) {
        let service = {};
        service.getHomeProducts = function(){
           return $http.get('items/getTopFive')
               .then(function (res) {
                   service.top5 = res.data;
                   $http.get('items/getNewItems').then(function (result) {
                       service.newProducts = result.data;
                       return Promise.resolve(result.data);
                   })
               }).catch(function(e) {
                   return Promise.reject(e);
               });
        };
        //service.getHomeProducts();
        service.login = function(user) {
            return $http.put('users/login', user)
                .then(function(response) {
                    let token = response.data;
                    $http.defaults.headers.common = {
                        'my-Token': token,
                        'user' : user.userMail
                    };
                    service.isLoggedIn = true;
                    //$rootScope.login = true;
                    return Promise.resolve(response);
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        };
        service.getCart = function(){
            return $http.get('carts/getMyCart/' + service.userSer.UserMail)
                .then(function (res) {
                    return Promise.resolve( res.data);
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        }
        service.userSer = {};
        service.initUser = function(){
            service.userSer.isLoggedIn = false;
            service.userSer.UserMail = 'guest';
            service.userSer.LastLogin = '';
            if(localStorageService.cookie.isSupported){
                let user = localStorageService.cookie.get('user');
                if(user){
                    service.userSer.UserMail = user.UserMail; // extract cookie data
                    service.userSer.LastLogin = user.Date;

                    $http.defaults.headers.common = {                  //use the token for the user requets
                        'my-Token': user.Token,
                        'user' : user.UserMail
                    };

                    service.userSer.isLoggedIn= true;                 //update that this is not a guest

                    //update the cookie for the new login time!
                    localStorageService.cookie.set('user',{UserMail: user.UserMail, Date: new Date(), Token: user.Token });
                }
            }
        };
        service.initUser();
        return service;
    }]);
//-------------------------------------------------------------------------------------------------------------------