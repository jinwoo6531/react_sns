const express = require('express');
const app = express(); //꼭 한번 호출을 해야한다.

app.get('/', (req,res) => {
    res.send('hello world');
});