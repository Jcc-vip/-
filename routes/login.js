var express = require('express');
var router = express.Router();
const user = require("../sql/user");

router.get('/', function(req, res, next) {
  // console.log('我进入了登录');
    res.render("login")
})
// 登录验证
router.post("/in", function (req, res, next) {
  

 let obj = req.body;

 console.log('进入登录验证')
 console.log(obj)
 console.log(obj.username);
console.log(obj.password)
console.log('obj.password后面')
 
user.findOne(obj, (err, data) => {
  if(data) {

      //  res.cookie('islogin','ok')
       req.session.islogin = 'ok';
      res.redirect('/pro')
  } else {
      res.redirect('/register')
  }
 
   
});
  
})


module.exports = router;