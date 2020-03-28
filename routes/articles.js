var express = require('express');
var router = express.Router();
var model = require('../model');

/*新建栏目接口*/
router.post('/addColumn', function(req, res, next) {
    var columnId = parseInt(req.query.columnId);//栏目id

    var data = {
        columnName : req.body.title,
        columnIntroduce : req.body.introduce,
        id:Date.now()
    };
    
    if(columnId){//修改
        data.id = columnId;

        if(data.columnName && data.columnIntroduce){

           model.connect(function (db) {

                db.collection('columns').updateOne({id: columnId},{$set:data},function (err,ret) {
                    if(err){
                        console.log('栏目修改失败',err);
                    }else{
                        console.log(data);
                    }
                })

          }); 
            
        }

        res.redirect('/writeArticles?columnId='+columnId);

    }else{//新增

        if(data.columnName && data.columnIntroduce){
            model.connect(function (db) {
                db.collection('columns').insertOne(data,function (err,ret) {
                    if(err){
                        console.log('栏目新建失败',err);
                    }else{
                        console.log(data);
                    }
                })
            })
        }else{
            console.log("------其中有空项------");
        }

        res.redirect('/write');
    }

});

/*删除栏目接口*/
router.get('/deleteColumn',function (req,res,next) {
    var id = parseInt(req.query.id);//栏目id

    model.connect(function (db) {
        db.collection('articles').deleteMany({columnId:id},function (err,ret) {
            if(err){
                console.log('删除失败');
            }else{
                console.log('删除文章成功');
            }
        });

        db.collection('columns').deleteOne({id:id},function (err,ret) {
            if(err){
                console.log('删除失败');
            }else{
                console.log('删除栏目成功');
            }
            
        });
    })
    
    res.redirect('/write');
})

/*新建文章接口*/
router.post('/newArticles',function(req,res,next){
    var columnId = parseInt(req.query.columnId);//栏目id
    var id = parseInt(req.query.id);//文章id

    var data = {
        articleTitle : req.body.title,
        articleIntroduce : req.body.introduce,
        articleContent: req.body.content,
        columnId: parseInt(req.query.columnId),
        id:Date.now()
    };

    if(id && columnId){//修改
        if(data.articleTitle && data.articleIntroduce && data.articleContent){
            model.connect(function (db) {

                db.collection('articles').updateOne({id: id},{$set:data},function (err,ret) {
                    if(err){
                        console.log('文章修改失败',err);
                    }else{
                        console.log(data);
                    }
                })

            });
        }else{
            console.log("------其中有空值------");
        } 
    }else{//新增
       if(data.articleTitle && data.articleIntroduce && data.articleContent){
            model.connect(function (db) {

                db.collection('articles').insertOne(data,function (err,ret) {
                    if(err){
                        console.log('文章新建失败',err);
                    }else{
                        console.log(data);
                    }
                })

           });
        }else{
            console.log("------其中有空值------");
        } 
    }
    
    res.redirect('/writeArticles?columnId='+columnId);
})

/*删除文章接口*/
router.get('/deleteArticles',function (req,res,next) {
    var id = parseInt(req.query.id);
    var columnId = parseInt(req.query.columnId);

    model.connect(function (db) {
        db.collection('articles').deleteOne({id:id},function (err,ret) {
            if(err){
                console.log('删除失败');
            }else{
                console.log('删除成功');
            }
            res.redirect('/writeArticles?columnId='+columnId);
        });
    })
})

module.exports = router;
