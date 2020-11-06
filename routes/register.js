var express = require("express");
//建立一个路由空表！！！！
var router = express.Router();
//引入user 模型 类似于英雄联盟  只能有六神装的设计
const user = require("../sql/user");

router.get("/", function (req, res, next) {
  console.log("此时进入了register");
  res.render("register");
});

router.post("/in", function (req, res, next) {
  console.log("进入register 的in 处理");

  let obj = req.body;
  // console.log(obj);
  // console.log(obj.username);
  // console.log(obj.password);

  //重复用户的解决问题
  //  user.insertMany(obj,(err,data)=>{
  //     if(err) {
     
  //         console.log(err)
  //     }
  //     console.log(data)

  //     if(data) {
  //         res.redirect('/login')
  //     }else {
  //         res.redirect('/register')
  //     }

  // })
if(obj.username==''){
  res.redirect('/register')
}else{
  //重复用户的第二种写法
user.findOne({username:obj.username},(err,data)=>{
  if(err ){

      console.log(err)
  }
  // 判断如果有数据，就重新跳到注册界面
  if(data) {
    console.log(data);
      res.redirect('/register')
  }else {
    // 如果没有就写入数据 跳转到登录界面
      user.insertMany(obj,(err,data)=>{
          if(err) {
              console.log(err)
          }
          console.log(data)
          res.redirect('/login')
      })
  }
})
}







//第三种写法
//   user.findOne({username:obj.username}, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     if (data) {
//       res.redirect("/register3");
//     } else {
//       user.insertMany(obj, (err, data) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log(data);

//         if (data) {
//           res.redirect("/login3");
//         } else {
//           res.redirect("/register3");
//         }
//       });
//     }
//   });

 
});

module.exports = router;
