const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();


// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
const {HOST = "http://47.100.177.41:9091", PORT = "8888"} = process.env;


// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});


// 设置端口
app.set("port", PORT);

// 静态页面
// 这里一般设置你的静态资源路径
let rootPath = 'dist';
app.use(express.static(rootPath));
app.use('index.html', function (req, res) {
  res.sendFile(path.resolve(rootPath, 'index.html'))
});

app.use(bodyParser.json());
// app.use('/api', userRouter);

// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
app.use(proxy("/CanteenProcurementManager", {target: HOST}));

// 监听端口
app.listen(app.get("port"), function () {
  console.log('Node app start at port 8888');
})
