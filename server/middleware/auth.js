const { User } = require("../models/User");

let auth = (req, res, next)=>{
    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    //토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true});

        //req에 토큰과 유저를 넣어줘서 (index.js)에서 유저정보를 가져올 수 있도록 함
        req.token = token;
        req.user = user;
        next(); //미들웨어서 다음으로 넘어갈 수 있도록
    })

    //유저가 있으면 인증 okay

    //유저 없으면 인증 no
}

module.exports ={auth};