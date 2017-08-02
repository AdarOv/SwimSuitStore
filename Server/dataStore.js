var Connection = require('tedious').Connection;
var data = {};

var user = process.env.DBUser || 'LironAdmin';
var password = process.env.DBPassword || 'LironAdar2017';
var server = process.env.DBServer || 'bgu.database.windows.net';
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
	userName: 'LironAdmin',
	password: 'LironAdar2017',
	server: 'bgu.database.windows.net',
    requestTimeout: 500000000000,
	options: { encrypt: true, database: 'SwimsuitShop' }
};

exports.SP = function (storedPrucedureName) {
    return new Promise(function(resolve,reject) {
        var connection = new Connection(config);
        var ans = [];
        var properties = [];
        connection.on('connect', function(err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err);
            }
            console.log('connection on');
            var dbReq = new Request('exec '+storedPrucedureName, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });

            dbReq.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            dbReq.on('row', function (row) {
                var item = {};
                for (i=0; i<row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            dbReq.on('requestCompleted', function () {
                console.log('request Completed: '+ dbReq.rowCount + ' row(s) returned');
                console.log(ans);
                connection.close();
                resolve(ans);

            });
            connection.execSql(dbReq);
        });
    });
}