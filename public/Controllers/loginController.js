//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['UserService', '$location', '$window',
    function(UserService, $location, $window) {
        let self = this;
        self.user = {userMail: '', password: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    if(success.data.length > 0){
                        $window.alert('You are logged in');
                        $location.path('/');
                    }
                    else {
                        $window.alert('log-in has failed');
                    }
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
    }]);
//--------------------------------------------------------------------------------------------------------------------
app.controller('registerController',['UserService', '$location', '$window', '$http',
    function(UserService, $location, $window, $http) {
        let self = this;

        self.userRegister = {
            user :{
            userPassword: '', email:'',
            country: '',firstQuestion: '', firstAnswer: '',secondQuestion: '',secondAnswer: '',
            permissions: false,firstName: '', lastName: '', address:'',city: '',
            phone: '',cellular: '',creditCardNumber:''},
            category :{
                category1:'',
                category2:'',
                category3:''}
        }

        self.categories = [];
        $http.get('items/getCategories').then(function (res) {
            self.categories = res.data;
        }).catch(function (e) {
            return Promise.reject(e);
        })
        self.register = function (valid) {
            if(valid){
                $http.post('users/register',self.userRegister).then(function (success) {
                    if(success.data[0].success){
                        $window.alert('Register Successfully');
                        $location.path('/');
                    }
                    else{
                        $window.alert('userName already exists');
                    }
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('register has failed');
                })
            }
        }
    }]);