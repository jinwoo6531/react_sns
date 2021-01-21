const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");

dotenv.config();
const app = express(); //꼭 한번 호출을 해야한다.
//서버 실행하며 sequelize도 실행해준다.
db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);
passportConfig();
app.use(
    cors({
        origin: "*",
    })
);
//front에서 넘어온 객체들을 해석해서 라우터로 보내준다. 위치중요!
app.use(express.json()); //json형식의 데이터를 반영
app.use(express.urlencoded({ extended: true })); //프론트에서 form을 썻을떄 이걸로 해석해야한다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
    console.log("실행중");
});
