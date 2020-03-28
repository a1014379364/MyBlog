var express = require('express');
var router = express.Router();
var model = require('../model');

/*登录接口*/
router.post('/login',function (req,res,next) {
  var data = {
    username : req.body.userName,
    password : req.body.userPassword
  };
  model.connect(function (db) {
    db.collection('users').find(data).toArray(function (err,docs) {
      if(err){
        res.redirect('/login');
      }else {
        if(docs.length>0){//当查询到账户才赋值session,不要轻易直接赋值session
          switch (docs[0].power) {//根据输出的权限等级，输出权限名称。
            case '1':
              req.session.power = "管理员";
              break;
            case '2':
              req.session.power = "超级管理员";
              break;
            default:
              req.session.power = "游客";
          }
          res.redirect('/');
        }else{
          res.redirect('/login');
        }
      }
    });
  })
});

/*退出接口*/
router.get('/logout',function (req,res,next) {
  req.session.power = null;
  res.redirect('/');
});

module.exports = router;
