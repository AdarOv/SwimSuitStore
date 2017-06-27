let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);
//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {
    let service = {};
    service.isLoggedIn = false;

    service.getHomeProducts = function(){
        if(!$rootScope.top5){
            $http.get('items/getTopFive')
                .then(function (res) {
                    $rootScope.top5 = res.data;

                    if(!$rootScope.newProducts){
                        $http.get('items/getNewItems')
                            .then(function (res) {
                                $rootScope.newProducts = res.data;
                            })
                            .catch(function (e) {
                                return Promise.reject(e);
                            });
                    }
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
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
}]);
//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "Views/Home.html",
            controller : "mainController"
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
