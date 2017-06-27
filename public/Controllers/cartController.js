'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope', 'UserService',
    function($scope, $http, localStorageService, $rootScope, UserService) {
        let self = this;

        $scope.items = UserService.getCart();

        $scope.addToCart = function (productName ) {
            alert(productName);
        };
    }]);