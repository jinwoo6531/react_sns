const express = require("express");
const app = express(); //꼭 한번 호출을 해야한다.
const postRouter = require("./routes/post");
const db = require("./models");

//서버 실행하며 sequelize도 실행해준다.
db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/post", postRouter);

app.listen(3065, () => {
    console.log("실행중");
});
