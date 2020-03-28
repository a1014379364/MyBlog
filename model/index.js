/*创建一个mongo的客户端对象*/
var MongoClient = require('mongodb').MongoClient;
/*连接数据库需要url*/
var url = 'mongodb://localhost:27017';
/*数据库名称*/
var dbName = 'myBlog';
/*封装一个方法用来连接数据库*/
function connect(callback){//？
    MongoClient.connect(url,function (err,client) {//第一个是错误对象，第二个是连接成功的对象
        if (err){
            console.log("数据库连接出现错误:",err);
        }else{
            var db = client.db(dbName);
            callback && callback(db);
            client.close();
        }
    })
}

module.exports = {
    connect
}