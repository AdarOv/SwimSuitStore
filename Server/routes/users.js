var express = require('express');
var moment = require('moment');
var router = express.Router();
var dbStore = require('../dataStore');
/* GET users listing. */

router.post('/register', function (req, res) {
  try {
      var userPassword = req.body.user.userPassword;
      var email = req.body.user.email;
      var lastLogin = moment().format('YYYY-MM-DDThh:mm:ss');
      var country = req.body.user.country;
      var firstQuestion = req.body.user.firstQuestion;
      var firstAnswer = req.body.user.firstAnswer;
      var secondQuestion = req.body.user.secondQuestion;
      var secondAnswer = req.body.user.secondAnswer;
      var permissions = req.body.user.permissions;
      var firstName = req.body.user.firstName;
      var lastName = req.body.user.lastName;
      var address = req.body.user.address;
      var city = req.body.user.city;
      var phone = req.body.user.phone;
      var cellular = req.body.user.cellular;
      var creditCardNumber = req.body.user.creditCardNumber;
      var category1 = req.body.category.category1;
      var category2 = req.body.category.category2;
      var category3 = req.body.category.category3;

      dbStore.SP("[dbo].[Register] '" + userPassword + "', '" + email + "', '" + lastLogin + "', '" + country + "', '" +
          firstQuestion + "', '" + firstAnswer + "', '" + secondQuestion + "', '" + secondAnswer + "', '" + permissions + "', '" +
          firstName + "', '" + lastName + "', '" + address + "', '" + city + "', '" + phone + "', '" + cellular + "', '" + creditCardNumber + "', '" + category1
          + "', '" + category2 + "', '" + category3 + "'").then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getUsers', function (req, res) {
  try {
      dbStore.SP('[getUsers]').then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
    res.status(400).send(exception);
    };
});

router.put('/login', function (req, res) {

      var mail = req.body.userMail;
      var password = req.body.password;
      dbStore.SP("[dbo].[userLogin] '" + mail + "', '" + password + "'").then(function (result) {
          res.send(result);
      }).catch (function (exception) {
          res.status(400).send(exception);
      });
});

router.get('/restorePassword/:userMail/:firstAns/:secondAns', function (req, res) {
  try {
      var userMail = req.params.userMail;
      var firstAns = req.params.firstAns;
      var secondAns = req.params.secondAns;
      dbStore.SP("[dbo].[restorePassword] '" + userMail + "', '" + firstAns + "', '" + secondAns + "'").then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getUserCategories/:userMail', function (req, res) {
  try {
      var userMail = req.params.userMail;
      dbStore.SP("[dbo].[getUserCategories] '" + userMail + "'").then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.put('/removeUser', function (req, res) {
  try {
      var mail = req.body.userMail;
      dbStore.SP("[dbo].[removeUser] '" + mail + "'").then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.put('/changePermissions',function (req, res) {
  try {
      var mail = req.body.userMail;
      var permission = req.body.permission;
      dbStore.SP("[dbo].[changePermissions] '" + mail + "', " + permission).then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getRecommendations/:userMail',function (req, res) {
  try {
      var userMail = req.params.userMail;
      dbStore.SP("[dbo].[recommendations] '" + userMail + "'").then(function (result) {
          if (result.length > 0)
              res.send(result);
          else
              dbStore.SP("[dbo].[categoriesRecommendations] '" + userMail + "'").then(function (result1) {
                  res.send(result1);
              });
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getUserQuestions/:userMail', function (req, res) {
  try {
      var userMail = req.params.userMail;
      dbStore.SP("[dbo].[getUserQuestions] '" + userMail + "'").then(function (result) {
          res.send(result);
      });
  }catch (exception)
    {
        res.status(400).send(exception);
    };
});

module.exports = router;
