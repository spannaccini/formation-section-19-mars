//node app.js
// npm init
// npm install express
// node app.js
// npm install nodemon --save-dev --> in package.json script ->    "start":"nodemon app.js",


const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express(); 

app.use(express.urlencoded({extended:false}));

app.get('/', function (req,res){
  res.send("hello world");
});


app.get('/form', function (req,res){
  res.send('<form action="/users" method="POST"><input type="text" name="username"></input><button>Submit 2</button></form>')
});


app.post('/users', function (req,res){
  
  const newUser = req.body.username;
  console.log(newUser);

 const fileUserspath = path.join(__dirname,'data','username.json');
 const listExistingUsers = JSON.parse(fs.readFileSync(fileUserspath))
 listExistingUsers.push(newUser);
 fs.writeFileSync(fileUserspath,JSON.stringify(listExistingUsers));
 res.send('Users stored');

});


app.get('/list-users', function (req,res){
  
  
 const fileUserspath = path.join(__dirname,'data','username.json');
 const listExistingUsers = JSON.parse(fs.readFileSync(fileUserspath))
 
 let listUsers = "<ul>";
 for (const users of listExistingUsers){
     
    listUsers+="<li>"+ users +"</li>";   

 }

 listUsers+="</ul>"
 
 res.send(listUsers);


});




app.listen(2020);