const express = require('express');
const app = express(); //꼭 한번 호출을 해야한다.
const postRouter = require('./routes/post');

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('실행중');
});
