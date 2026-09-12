const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3270;
const datafile = path.join(__dirname, 'datafile.json');

const server = http.createServer((req, res) => {
    if (req.url === '/style.css' && req.method === 'GET') {
        res.statusCode = 200;
        let pathcss = path.join(__dirname, 'frontend', 'style.css');
        fs.readFile(pathcss, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('INTERNAL SERVER ERROR');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(data);
        })
        return;
    }
     if (req.method === 'POST' && req.url === '/students') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                const formData = JSON.parse(body);
                fs.readFile(datafile, 'utf-8', (err, data)=>{
                    let value = [];
                    if (!err && formData) {
                        value = JSON.parse(data);
                    }
                    value.push(formData);
                    fs.writeFile(
                        datafile,
                         JSON.stringify(value, null, 2)
                        ,
                        (err) =>{ if(err){
                            res.statusCode = 500;
                            res.end('ERROR READING THIS FILE');
                            return;
                        }
                res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        message: 'Contact stored successfully'
          }));
                }

            );
        });
    }) ;
    return;}


    if (req.method === 'GET') {
        let filePath;
        if (req.url === '/') {
            filePath = 'index.html';
        }
        else if (req.url === '/about') {
            filePath = 'about.html';
        }
        else if (req.url === '/courses/bca') {
            filePath = 'bca.html';
        }
        else if (req.url === '/courses/btech') {
            filePath = 'btech.html';
        }
        else if (req.url === '/contact') {
            filePath = 'contact.html';
        }
        else if (req.url === '/courses') {
            filePath = 'courses.html';
        }
        else if (req.url === '/facilities') {
            filePath = 'facilities.html';
        }
        else if (req.url === '/placement') {
            filePath = 'placement.html';
        }
        else if (req.url === '/students') {
            filePath = 'students.html';
        }
        else {
            res.statusCode = 404;
            res.end('PAGE NOT FOUND');
            return;
        }
        
let fullPath = path.join(__dirname, 'frontend', filePath);
fs.readFile(fullPath, 'utf-8', (err, data) => {
    if (err) {
        res.statusCode = 500;
        res.end('INTERNAL SERVER ERROR');
        return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
})}

})
server.listen(3270, () => {
    console.log('Server Running');
})