var express = require('express');
var moment = require('moment');
var router = express.Router();
var dbStore = require('../dataStore');

router.get('/getItemsByCategory/:categoryName', function (req, res) {
    try {
        var categoryName = req.params.categoryName;
        dbStore.SP("[dbo].[getItemsByCategory] '" + categoryName + "'").then(function (result) {
            res.send(result);
        });
    }catch(exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getAllItems', function (req, res) {
    try {
        dbStore.SP("[dbo].[getAllItems]").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getCategories', function (req, res) {
    try {
        dbStore.SP("[dbo].[getCategories]").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getNewItems', function (req, res) {
    try {
        var startdate = moment().subtract(1, "month").format('YYYY-MM-DDThh:mm:ss');
        dbStore.SP("[dbo].[getNewItems] '" + startdate + "'").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/showItemInfo/:itemID', function (req,res) {
    try {
        var itemID = req.params.itemID;
        dbStore.SP("[dbo].[getItem] " + itemID).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/searchItem/:itemName', function (req,res) {
    try {
        var itemName = req.params.itemName;
        dbStore.SP("[dbo].[searchItem] " + itemName).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.post('/addItem', function (req,res) {
    try {
        var itemName = req.body.itemName;
        var size = req.body.size;
        var color = req.body.color;
        var manufacturer = req.body.manufacturer;
        var price = req.body.price;
        var quantity = req.body.quantity;
        var category = req.body.category;
        var addDate = moment().format('DD-MM-YYYY');
        var image = req.body.image;

        dbStore.SP("[dbo].[addItem] '" + itemName + "', '" + size + "', '" + color + "', '" + manufacturer + "', " +
            price + ", " + quantity + ", '" + category + "', '" + addDate + "', " + image).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.put('/removeItem', function (req,res) {
    try {
        var itemID = req.body.itemID;
        dbStore.SP("[dbo].[removeItem] " + itemID).then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getNewItems', function (req,res) {
    try {
        dbStore.SP("[dbo].[getItemsByMonth] ").then(function (result) {
            res.send(result);
        });
    }catch (exception)
    {
        res.status(400).send(exception);
    };
});

router.get('/getTopFive', function (req,res) {
    try {
        dbStore.SP("[dbo].[getTopFiveItems] ").then(function (result) {
            res.send(result)
        });
    }
    catch(exception)
    {
        res.status(400).send(exception);
    }
    ;
});


module.exports = router;