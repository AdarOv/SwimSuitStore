//-------------------------------------------------------------------------------------------------------------------
app.controller('shopController', ['UserService','$window','$http','$rootScope','$location',
    function (UserService, $window, $http, $rootScope, $location) {
    let self = this;
    self.isLoggedIn = UserService.userSer.isLoggedIn;

    self.setCategory = function (category) {
        if(category == 'All'){
            self.products = self.AllProducts;
        }
        else {
            $http.get('items/getItemsByCategory/'+category).then(function (result) {
                self.products = result.data;
                return Promise.resolve();
            }).catch(function (err) {
                return Promise.reject(err);
            })
        }
    }

    self.initial = function () {
        $http.get('items/getCategories').then(function (result) {
            self.categories = result.data;
            $http.get('items/getAllItems').then(function (res) {
                self.products = res.data;
                self.AllProducts = res.data;
                if(self.isLoggedIn) {
                    $http.get('users/getRecommendations/' + UserService.userSer.UserMail).then(function (ans) {
                        self.recommendedItems = ans.data;
                    })
                }
            })
        }).catch( function (err) {
            return Promise.reject(err);
        });
    }
    self.addToCart = function (item) {
        if(UserService.userSer.UserMail != 'guest'){
            let details = {itemID:item.id, userMail:UserService.userSer.UserMail, quantity:1};
            $http.put('carts/addToCart', details).then(function(results){
                if(results.data[0].success){
                    $window.alert("Product successfully added");
                }
                else {
                    $window.alert("Something went wrong");
                }
            })
        }
        else{
            $window.alert("You need to loggedIn first!");
        }
    }
    self.initial();
}]);