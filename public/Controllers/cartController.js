'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$window', '$http','localStorageService', '$location', 'UserService',
    function($window, $http, localStorageService, $location, UserService) {
        let self = this;

        self.getCart =function () {
            UserService.getCart().then(function(result){
                self.items = result;
                self.getTotal();
            }).catch(function (err) {

            });
        };
        self.getCart();
        self.removeItem = function (item) {
            let details = {itemID:item.itemID, userMail: UserService.userSer.UserMail, quantity: -1};
            $http.put('carts/addToCart',details).then(function (res) {
                if(!res.data[0].success){
                    $window.alert("Something went wrong");
                }
                else{
                    self.getCart();
                }
            }).catch(function (err) {
                $window.alert("Something went wrong");
            })
        }
        self.getTotal = function(){
            var total = 0;
            for(var i = 0; i < self.items.length; i++){
                var product = self.items[i];
                total += (product.price * product.quantity);
            }
            self.total = total;
            return total;
        }

    }]);