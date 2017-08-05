/**
 * Created by liron on 05/08/2017.
 */
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('orderController', ['$window', '$http', '$location', 'UserService','$scope','ngDialog',
    function($window, $http, $location, UserService, $scope) {
        let self = this;
        let itemDialog = '<img ng-src="{{ngDialogData.image}}" class="img-responsive"/> <br/> '
            +' <label class="modalHeader">Name:</label> <label class="modalText">{{ngDialogData.itemName}}</label>  <br/>  '
            +' <label class="modalHeader">Price: </label> <label class="modalText"> {{ngDialogData.price}} $ </label>  <br/>'
            +' <label class="modalHeader">Category: </label> <label class="modalText">{{ngDialogData.category}}</label> <br/>'
            +' <label class="modalHeader">Manufacturer: </label> <label class="modalText"> {{ngDialogData.manufacturer}}</label> <br/>'
            +' <label class="modalHeader">Color: </label> <label class="modalText"> {{ngDialogData.color}}</label> <br/>'
            +' <label class="modalHeader">Size: </label> <label class="modalText"> {{ngDialogData.size}}</label> <br/>';

        self.getPreviousOrders = function () {
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
        self.getPreviousOrders();

        self.getItems = function(){
            $http.get('items/getAllItems').then(function (res) {
                self.items = res.data;
            })
        };
        self.getItems();

        self.getItem = function(itemID){
            for(var i = 0; i < self.items.length; i++){
                if(self.items[i].itemID == itemID){
                    return items[i];
                }
            }
        };

        self.getCurrentOrder = function(){
            var currentOrder = UserService.getCurrentOrder();
            var relevantItems = [];
            for (var i = 0; i < self.orders.length; i++){
                if (orders[i].orderID == currentOrder){
                    var item = getItem(orders[i].itemID);
                    item["qty"] = orders[i].qty;
                    relevantItems.push(item);
                }
            }
            self.items = relevantItems;
            return currentOrder;
        };

        self.getOrder = function (orderID) {
            $http.get('carts/getOrder/'+orderID).then(function (res) {
                self.orderDetails = res.data[0];
            }).catch(function (err) {
            })
        };
        self.getOrder(UserService.getCurrentOrder());

        self.getPrice = function(){
            return self.orderDetails.currency;
        };

        self.getDeliveryDate = function(){
            return self.orderDetails.deliveryDate.substring(0,10);
        };

        self.getOrderDate = function(){
            return self.orderDetails.orderDate.substring(0,10);
        };

        self.open = function(item) {
            ngDialog.open({ template:itemDialog,
                className: 'ngdialog-theme-default',
                data: item,
                showClose: true,
                width: 640
            });
        };

    }]);