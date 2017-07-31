//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['UserService', '$location', '$window','$http','localStorageService',
    function(UserService, $location, $window, $http, localStorageService) {
        let self = this;
        self.user = {userMail: '', password: ''};
        self.restorePassword = false;
        self.restore = function (valid) {
            if(valid){
                $http.get('/users/getUserQuestions/'+self.user.userMail).then(function(result){
                    if(result.data.length > 0){
                        self.firstQuestion = result.data[0].firstQuestion;
                        self.secondQuestion = result.data[0].secondQuestion;
                        self.restorePassword = true;
                    }
                }),function (error) {
                    self.errorMessage = error.data.message;
                }
            }
        }
        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    var token = success.data;
                    if(token.length > 0){
                        var cookieObject = {UserMail: self.user.userMail, Date: new Date(), Token: token };
                        localStorageService.cookie.set('user',cookieObject);
                        $window.alert('You are logged in');
                        UserService.initUser();
                        $location.path('/');
                    }
                    else {
                        $window.alert('log-in has failed');
                    }
                }, function (error) {
                    self.errorMessage = error.data.message;
                    $window.alert('log-in has failed');
                })
            }
        };
        self.getPassword= function () {
            self.errorMessage ="";
            $http.get('/users/restorePassword/'+self.user.userMail+'/'+self.firstAnswer+'/'+self.secondAnswer).then(
                function (result) {
                    if(result.data.length > 0){
                        self.userPassword = result.data[0].password;
                        self.restorePassword = false;
                    }
                    else {
                        self.errorMessage = "Wrong answers.";
                    }
                },function (err) {
                    self.errorMessage = err.data.message;
                }
            )
        }
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
                phone: '',cellular: '',creditCardNumber:''
            },
            category :{
                category1:'',
                category2:'',
                category3:''
            }
        }

        self.categories = [];
        self.loadCategories = function () {
            $http.get('items/getCategories').then(function (res) {
                self.categories = res.data;
            }).catch(function (e) {
                return Promise.reject(e);
            })
        }

        self.register = function (valid) {
            if(valid){
                $http.post('users/register',self.userRegister).then(function (success) {
                    if(success.data[0].success){
                        $window.alert('Register Successfully');
                        $location.path('/login');
                    }
                    else{
                        $window.alert('userName already exists');
                    }
                }, function (error) {
                    self.errorMessage = error.data.message;
                    $window.alert('register has failed');
                })
            }
        }

        function loadCountriesFromDoc() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "../countries.xml", true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    getCountries(this);
                }
            };

        }
        function getCountries(xml) {
            let i;
            let xmlDoc = xml.responseXML;
            let temp = [];
            let x = xmlDoc.getElementsByTagName("Country");
            for (i = 0; i <x.length; i++) {
                let json = { "ID" :x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue.toString(),
                    "Name" :x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString()}
                temp.push(json);
            }
            self.Countries = temp;
        }
        loadCountriesFromDoc();
        self.loadCategories();
    }]);