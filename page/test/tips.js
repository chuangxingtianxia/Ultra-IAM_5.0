/**
 * Created by gaochuang on 2017/7/17.
 */
var http=require("http");

var sever = http.createServer(function(req,res){
    console.log(req.url)
    console.log('111')
    res.end('sr')
})

sever.listen("3000",'127.0.0.1')

