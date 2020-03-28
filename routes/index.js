var express = require('express');
var router = express.Router();
var model = require('../model');
var moment = require('moment');

/* 渲染首页 */
router.get('/', function(req, res, next) {
  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }

  var columnData ={
    columnName: '个人首页',
    columnIntroduce:'这个作者很懒，什么都没有留下......'
  }

  model.connect(function (db) {

    db.collection('columns').find({}).toArray(function (err,docs) {
      if(err){
        console.log("数据查询失败",err);
      }else {

        docs.map(function (ele,index) {
          ele['time'] = moment(ele.id).format('YYYY-MM-DD HH:mm:ss');
        })
        data = docs;

        res.render('index',{data: data,power: power,columnData:columnData});
      }
    });
  
  });

});

/*渲染未开放功能页面*/
router.get('/close', function(req, res, next) {
  res.render('close',{});
});

/*渲染登录功能页面*/
router.get('/login', function(req, res, next) {
  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }
  res.render('login',{ power : power});
});

/*渲染编辑栏目功能页面*/
router.get('/write', function(req, res, next) {
  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }

  var columnData = {
    id:null
  };

  model.connect(function (db) {

    db.collection('columns').find({}).toArray(function (err,docs) {
      if(err){
        console.log("数据查询失败",err);
      }else {
        docs.map(function (ele,index) {
          ele['time'] = moment(ele.id).format('YYYY-MM-DD HH:mm:ss');
        })
        data = docs;

        res.render('write',{data: data,power: power,columnData:columnData});
      }
    });
  
  });

});

/*渲染编辑文章页面*/
router.get('/writeArticles', function(req, res, next) {
  var columnId = parseInt(req.query.columnId);//栏目id

  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }

  var data;

  model.connect(function (db) {

    db.collection('articles').find({columnId:columnId}).toArray(function (err,articlesDocs) {//文章查询
      if(err){
        console.log("文章查询失败",err);
      }else {
        articlesDocs.map(function (ele,index) {
          ele['time'] = moment(ele.id).format('YYYY-MM-DD HH:mm:ss');
        })
        data = articlesDocs;//闭包型数据
        
        model.connect(function (db) {

          db.collection('columns').find({id:columnId}).toArray(function(err,columnDocs){//栏目信息查询
            if(err){
              console.log("栏目查询失败",err);
            }else{
              columnData = columnDocs[0];

              res.render('writeArticles',{data: data,power: power,columnId:columnId,columnData:columnData});
            }
          });

        });

      }
    });

  });

});

/*渲染新增文章页面/编辑文章页面*/
router.get('/newArticles', function(req, res, next) {
  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }

  var id = parseInt(req.query.id);//文章id
  var columnId = parseInt(req.query.columnId);//栏目id


  if(id && columnId){//编辑
    model.connect(function (db) {

      db.collection('articles').find({id:id}).toArray(function (err,docs) {
        if(err){
          console.log("数据查询失败",err);
        }else {
          var data = docs[0];
          console.log(data);
          res.render('newArticles',{data: data,power: power,columnId:columnId});
        }
      });
      
    });
  }else{//新增
    res.render('newArticles',{power: power,columnId:columnId});
  }
  

});

/*渲染文章阅读页面*/
router.get('/watchArticles', function(req, res, next) {
  var columnId = parseInt(req.query.columnId);//栏目id
  var id = parseInt(req.query.id);//文章id

  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }

  var article = {
    articleTitle:'',
    articleIntroduce:'',
    articleContent:''
  };

  model.connect(function (db) {

    db.collection('articles').find({columnId:columnId}).toArray(function (err,docs) {
      if(err){
        console.log("文章查询失败",err);
      }else {
        var data = docs;
        article.articleTitle = data[0].articleTitle;
        article.articleIntroduce = data[0].articleIntroduce;
        article.articleContent = data[0].articleContent;

        if(id){//分页访问

          model.connect(function (db) {
    
            db.collection('articles').find({id:id}).toArray(function (err,docs) {
              if(err){
                console.log("文章查询失败",err);
              }else {
                article.articleTitle = docs[0].articleTitle;
                article.articleIntroduce = docs[0].articleIntroduce;
                article.articleContent = docs[0].articleContent;
                
                res.render('watchArticles',{ power : power,data : data,article : article,columnId : columnId});
              }
            });
            
          });

        }else{//初次访问
          res.render('watchArticles',{ power : power,data : data,article : article,columnId : columnId});
        }

      }
    });
    
  });
  
});

module.exports = router;
