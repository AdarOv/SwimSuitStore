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
        self.showPrOrder = false;
        self.getTotal = function(){
            var total = 0;
            for(var i = 0; i < self.items.length; i++){
                var product = self.items[i];
                total += (product.price * product.quantity);
            }
            self.total = total;
            return total;
        }
        self.getPreviousOrder = function () {
            if(self.showPrOrder){
                self.showPrOrder = false;
            }
            else{
                $http.get('carts/getMyOrders/'+UserService.userSer.UserMail).then(function (res) {
                    self.orders = res.data;
                    self.showPrOrder = true;
                }).catch(function (err) {

                })
            }
        }
    }]);