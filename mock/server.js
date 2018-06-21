let http = require("http");
let fs = require("fs");
let url = require("url");

//获取轮播图数据
let sliders = require('./sliders.js');

//获取图书数据
function read(cb){
  fs.readFile('./book.json','utf8',function(err,data){
    if(err || data.length == 0){
      cb([]);//如果有错误 或文件没长度， 就是空数组
    } else {
      cb(JSON.parse(data)); //将都出来的内容转化为对象
    }
  })
}
//写入内容
function write(data,cb){
  fs.writeFile('./book.json',JSON.stringify(data),cb);
};


http.createServer((req,res)=>{
	//设置允许跨域的客户端请求地址 
    res.setHeader("Access-Control-Allow-Origin", "*");
	//
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS"){
      return res.end('200');/*让options请求快速返回*/
    }
    let {pathname,query} = url.parse(req.url,true);//把query转化成对象
    
    if (pathname ==='/page'){
      let offset = parseInt(query.offset) || 0;
      let hasMore = true;
      read(function(books) {
        let book = books.slice(offset,offset + 5);
        if (books.length < offset + 5){
          hasMore = false;
        }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({hasMore:hasMore,book:book}));
        return ;
      })
    }
    if(pathname === '/sliders'){
      res.end(JSON.stringify(sliders));
      return ;
    }

    if (pathname === '/hotbook'){
      read(function (books){
        let hot = books.reverse().slice(0,6);
        res.writeHead(200,{'Content-Type':'application/json'});
        setTimeout(function(){
          res.end(JSON.stringify(hot));
          return ;
        },1000);

      })
    }
  if (pathname === '/booklist'){
    let id = parseInt(query.id);
    switch(req.method){
      case 'GET':
        if(!isNaN(id)){
          read(function(books) {
            let book = books.find(function(item){
              return item.bookId === id;
            });
            if (!book) book = {};//如果没找到则返回空对象
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(book));
          })
        }else{
          read(function(book){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(book));
          })
        }
        break;
      case 'DELETE':
        read(function(books){
          //books = books.filter(item => item.bookId != id);
          //console.log(books);
          write(books,function(){
            res.end('删除成功');
          })
        })
        break;
      case 'POST':
        let str = '';
        req.on('data',chunk => {
          str += chunk;
        });
        req.on('end',() => {
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length ? books.length + 1 : 1;
            books.push(book);
            write(books,function () {
              res.end(JSON.stringify(book));
            })
          })
        })
        break;
      case 'PUT':
        if (id){
          let str = '';
          req.on('data',chunk => {
            str += chunk;
          });
          req.on('end',() => {
            let book = JSON.parse(str);
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id){//找到id相同的那本书返回
                  return book;
                }
                return item;//其他书正常返回
              })
              write(books,function () {//将数据写回JSON
                res.end(JSON.stringify(book));
              })
            })
          })
        }
        break;

    }
  }
}).listen(3000,function(){
  console.log('server is success,listening on 3000 port!')
});
