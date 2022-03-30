//node app.js
// npm init
// npm install express
// node app.js

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));


app.post('/result', function(req,res){
    
    newUserName = req.body.username;
    console.log(newUserName);

    const pathUsersFile = path.join(__dirname,'data','username.json');
    const existingUsersParse = JSON.parse(fs.readFileSync(pathUsersFile));
    existingUsersParse.push(newUserName);
    fs.writeFileSync(pathUsersFile, JSON.stringify(existingUsersParse));
     console.log(existingUsersParse);
     res.send("yser stored");

});

app.get('/form', function(req,res){
  res.send('<form action="/result" method="POST"><input type="text" name="username"></input><button>submit</button></form>');
});

app.get('/users', function(req,res){
  const pathUsersFile = path.join(__dirname,'data','username.json');
  const existingUsersParse = JSON.parse(fs.readFileSync(pathUsersFile));

  let responseData = '<ul>';

  for(const user of existingUsersParse){
    responseData += '<li>' + user +'</li>';
  }

  responseData+= '</ul>';

  res.send(responseData);
})

app.listen(6060); 