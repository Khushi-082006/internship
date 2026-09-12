 const http=require('http');
 const port=3270;
//  console.log(http);
const server=http.createServer((req,res)=>{
    // console.log(res);
    // console.log("URL:",req.url);
    // console.log("METHOD:",req.method);
    // console.log("headers:",req.headers);
    if(req.url==='/home'||req.url==='/'){ res.end('home page');}
    else if(req.url ==='/contact'){ res.end('contact page');}
     else if(req.url ==='/about'){ res.end('about page');}
       else if(req.url ==='/login'&& req.method==='GET'){ res.end('login page');}
       else if(req.url ==='/login'&& req.method==='POST'){ res.end('submitted page');}
       else { res.statusCode=404; 
        res.end('page not found');}
    // res.statusCode=200;
    // res.statusMessage="wott";
    // res.setHeader('content-type','text');
    // res.write("hello \n");
    // res.end('learing node js');
    // res.end(' server');
    // res.writeHead(200,('content-type','text')); combine status code and header
res.end("hello from khushi");
})
server.listen(port,()=>{
    console.log("server is running on port",port);
})//tell os about the port
