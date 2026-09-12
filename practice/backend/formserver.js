const http = require('http');
const fs = require('fs');
const path = require('path');


const dataFile = path.join(__dirname, 'data.json');

const port = 3270;
//  const datafolder =path.join(__dirname,'data');
//  const studentfile=path.join()
const server = http.createServer((req, res) => {
    // console.log("URL", req.url);
    // console.log("METHOD", req.method);
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // if (req.method === 'OPTIONS') {
    //     res.statusCode = 204;
    //     res.end();
    //     return;
    // }

    if (req.method === 'GET') {
        // fs.readFile(dataFile,'utf-8',(err,data)=>{
        //     if(err){
        //         res.statusCode=500;
        //         res.end('ERROR READING THIS FILE');
        //         return;
        //     }
        //     res.setHeader('Content-Type','application/json');
        //     res.end(data);
        // })
        let filePath;
        if (req.url === '/' || req.url === '/practice/frontend/index.html') {
            filePath = path.join(__dirname, '..', 'frontend', 'index.html');
        }
        else if (req.url === '/practice/frontend/script.js') {
            filePath = path.join(__dirname, '..', 'frontend', 'script.js');

        } else if (req.url === '/data.json' || req.url === '/student') {
            filePath = dataFile;

        }
        //         else if (req.url === '/student') {
        //     filePath = dataFile;
        // }
        else {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('ERROR READING THIS FILE');
                return;
            }
            if (filePath.endsWith('.html')) {
                res.setHeader('Content-Type', 'text/html');
            }
            else if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'text/javascript');
            }
            else {
                res.setHeader('Content-Type', 'application/json');
            }
            res.end(data);
        })
        return;

    }
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const formData = JSON.parse(body);
            fs.readFile(dataFile, 'utf-8', (err, data) => {
                let contacts = [];
                if (!err && data) {
                    contacts = JSON.parse(data);
                }
                contacts.push(formData);
                fs.writeFile(dataFile,
                    JSON.stringify(contacts, null, 2),
                    (err) => {
                        if (err) {
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

                )
            })
        })
    }

})
server.listen(3270, () => {
    console.log('Server running');
});