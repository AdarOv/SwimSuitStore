var express = require('express');
var moment = require('moment');
var router = express.Router();
var dbStore = require('../dataStore');

router.put('/addToCart', function (req, res) {
    try {
        var itemID = req.body.itemID;
        var userMail = req.body.userMail;
        var quantity = req.body.quantity;
        dbStore.SP("[dbo].[addToCart] " + itemID + ", '" + userMail + "', " + quantity).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getMyCart/:userMail', function (req, res) {
    try {
        var userMail = req.params.userMail;
        dbStore.SP("[dbo].[getMyCart] '" + userMail + "'").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.post('/pay', function (req, res) {
    try {
        var userMail = req.body.userMail;
        var deliveryDate = req.body.deliveryDate;
        var price = req.body.price;
        var currency = req.body.currency;
        dbStore.SP("[dbo].[pay] '" + userMail + "', '" + deliveryDate + "', '" + currency + "', " + price).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getMyOrders/:userMail', function (req, res) {
    try {
        var userMail = req.params.userMail;
        dbStore.SP("[dbo].[getMyOrders] '" + userMail + "'").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getOrder/:orderID', function (req, res) {
    try {
        var orderID = req.params.orderID;
        dbStore.SP("[dbo].[getOrder] '" + orderID + "'").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.post('/changeCurrency',function (req, res) {
    try {
        var currency = req.body.currency;
        var price = req.body.price;
        dbStore.SP("[dbo].[changeCurrency] '" + currency + "', " + price).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

module.exports = router;