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
        //service.top5 = null;
        service.isLoggedIn = false;
        //$rootScope.login = false;
        service.getHomeProducts = function(){
            if(!service.top5){
                $http.get('items/getTopFive')
                    .then(function (res) {
                        service.top5 = res.data;
                    }),function (e) {
                    return Promise.reject(e);
                };
            }
        };
        service.login = function(user) {
            return $http.put('users/login', user)
                .then(function(response) {
                    let token = response.data;
                    $http.defaults.headers.common = {
                        'my-Token': token,
                        'user' : user.userMail
                    };
                    service.isLoggedIn = true;
                    $rootScope.login = true;
                    return Promise.resolve(response);
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        };
        service.getCart = function(){
            $http.get('/getMyCart/:' + user.userMail)
                .then(function (res) {
                    return res.data;
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        }

        service.initUser = function(){
            $rootScope.guest = true;
            $rootScope.UserMail = '';
            $rootScope.LastLogin = '';
            if(localStorageService.cookie.isSupported){
                let user = localStorageService.cookie.get('user');
                if(user){
                    $rootScope.UserMail = user.UserMail; // extract cookie data
                    $rootScope.LastLogin = user.Date;

                    $http.defaults.headers.common = {                  //use the token for the user requets
                        'my-Token': user.Token,
                        'user' : user.UserMail
                    };

                    $rootScope.guest=false;                 //update that this is not a guest

                    //update the cookie for the new login time!
                    var cookieObject = {UserMail: user.UserMail, Date: new Date(), Token: user.Token }
                    localStorageService.cookie.set('user',cookieObject);
                }
            }
        };
        return service;
    }]);
//-------------------------------------------------------------------------------------------------------------------