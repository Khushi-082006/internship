// const fs=require('fs');
// console.log(fs);
// task 1
// fs.readFile('text.txt',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else {

//         fs.appendFile('text3.txt',data,(err)=>{
//      if(err){
//         console.log(err);
//     }
//     else {console.log("appended")}
//         })
//          console.log("success");
//     }

// });
// task 2
//  const data=fs.readFileSync('text3.txt','utf8');
//  fs.appendFileSync('text.txt',data);
//  console.log('success');


// console.log("khushi");
// fs.appendFile('text.txt','hello',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//          console.log("success");
//     }

// });
// fs.readFile('text.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//          console.log("success");
//     }

// });
// fs.unlink('text.txt',(err)={
//       if(err){
//         console.log(err);
//     }
//     else {
//          console.log("success");
//     }
// });
// fs.unlink('text.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//          console.log("success");
//     }

// });
// do it with sync take input from from terminal 
// create a program that seaches a directory for files with a specific extension and copies them to a new directory (recursive /non recursive)
let fp = require('fs');
let path = require('path');
let arr = [];
const source = process.argv[2];
const extension = process.argv[3];
const destination = process.argv[4];
let res = fp.existsSync(source);
if (!res) {
    console.log("source directory dont exist");
    process.exit();
}
if (!fp.existsSync(destination)) {
    fp.mkdirSync(destination);
}
//  let data =fp.readdirSync(source);
//  arr=data.filter(function(file){
//     return path.extname(file)===extension;
//  });
//  for(let file of arr){
//     fp.copyFileSync(source+'/'+file, destination+'/'+file);
//      }
//      console.log("copied");
function findfolder(folder) {
    let data = fp.readdirSync(folder);
    for (let file of data) {
        let fullpath = path.join(folder, file);
        let fileinfo = fp.statSync(fullpath);
        if (fileinfo.isDirectory()) {
            findfolder(fullpath);
        }
        else {
            if (path.extname(file) === extension) {
                fp.copyFileSync(fullpath, destination + '/' + file)

            } console.log("copied");
        }
    }
}
findfolder(source);