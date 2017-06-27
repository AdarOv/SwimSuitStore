let app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);
//-------------------------------------------------------------------------------------------------------------------
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;
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
