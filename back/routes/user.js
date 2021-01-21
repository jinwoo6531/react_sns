const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

//POST /user/login 로그인
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginerr) => {
            if (loginErr) {
                console.error(loginerr);
                return next(loginErr);
            }

            return res.status(200).json(user);
        });
    })(req, res, next);
});

router.post("/user/logout", (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send("ok");
});

//POST /user/ 회원가입
router.post("/", async (req, res, next) => {
    try {
        //회원가입전 중복 이메일 체크
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용중인 아이디입니다.");
        }

        //비밀번호 암호화
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //bcrypt도 비동기이므로 await를 써줘야한다. 숫자는 높을수록 보안이 쌔진다.
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });

        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        next(error); //status 500
    }
});

module.exports = router;
