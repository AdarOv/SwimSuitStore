'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$window', '$http', '$location', 'UserService','$scope','ngDialog',
    function($window, $http, $location, UserService, $scope, ngDialog) {
        let self = this;
        let itemDialog = '<img ng-src="{{ngDialogData.image}}" class="img-responsive"/> <br/> '
            +' <label class="modalHeader">Name:</label> <label class="modalText">{{ngDialogData.itemName}}</label>  <br/>  '
            +' <label class="modalHeader">Price: </label> <label class="modalText"> {{ngDialogData.price}} $ </label>  <br/>'
            +' <label class="modalHeader">Category: </label> <label class="modalText">{{ngDialogData.category}}</label> <br/>'
            +' <label class="modalHeader">Manufacturer: </label> <label class="modalText"> {{ngDialogData.manufacturer}}</label> <br/>'
            +' <label class="modalHeader">Color: </label> <label class="modalText"> {{ngDialogData.color}}</label> <br/>'
            +' <label class="modalHeader">Size: </label> <label class="modalText"> {{ngDialogData.size}}</label> <br/>';

        self.getCategories = function () {
            $http.get('items/getCategories').then(function (result) {
                self.categories = result.data;
            }).catch( function (err) {
                return Promise.reject(err);
            });
        };
        self.getCategories();

        self.getCart = function () {
            UserService.getCart().then(function(result){
                self.items = result;
                self.getColors();
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
        };
        self.showPrOrder = false;

        self.getColors = function(){
            var existingColors = [];
            for(var i = 0; i < self.items.length; i++){
                if (!existingColors.includes(self.items[i].color))
                    existingColors.push(self.items[i].color);
            }
            self.colors = existingColors;
        };

        self.getTotal = function(){
            var total = 0;
            for(var i = 0; i < self.items.length; i++){
                var product = self.items[i];
                total += (product.price * product.quantity);
            }
            self.total = total;
            return total;
        };
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
        };

        self.open = function(item) {
            ngDialog.open({ template:itemDialog,
                className: 'ngdialog-theme-default',
                data: item,
                showClose: true,
                width: 640
            });
        };

        self.setCurrentOrder = function(order){
            UserService.setCurrentOrder(order);
        };
    }]);