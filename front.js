const path = require('path');
const express = require('express');
const app = express();
const mysql = require("mysql2")

// https://api.messagebotfarm.ru/ - serv
// http://localhost:3000/ - local

var cors = require('cors')
app.use(cors())


const fs=require("fs")
const connection = mysql.createConnection({
    host: "rc1b-oo0r1cutb0wqf6qq.mdb.yandexcloud.net",
    user: "crm",
    database: "TgBot",
    password: "3HZOdQSA",
    ssl  : {
      ca : fs.readFileSync('./root.crt'),
    }
});


app.get('/hello', (req, res) => {
    base1=[]
    connection.query("SELECT * FROM questions", function(err, baseresults) {
        baseresults.forEach((item)=>{
          if (item.anketaopts.length>0)
          {item.anketaopts=JSON.parse(item.anketaopts)}
          else {item.anketoopts=[]}
          base1.push(item)
        })
        res.json(base1);
      })
});


app.get('/hello2', (req, res) => {
  base2=[]
  connection.query("SELECT * FROM selection", function(err, baseresults) {
      baseresults.forEach((item)=>{
        if (item.anketaopts.length>0)
        {item.anketaopts=JSON.parse(item.anketaopts)}
        else {item.anketoopts=[]}
        base2.push(item)
      })
      res.json(base2);
    })
});

app.get('/hello3', (req, res) => {
  base3=[]
  connection.query("SELECT * FROM offers", function(err, baseresults) {
      baseresults.forEach((item)=>{
        if (item.jsonopts.length>0)
        {item.jsonopts=JSON.parse(item.jsonopts)}
        else {item.jsonopts=[]}
        base3.push(item)
      })
      res.json(base3);
    })
});

app.get('/hello4', (req, res) => {
  base4=[]
  connection.query("SELECT * FROM clients", function(err, baseresults) {
      baseresults.forEach((item)=>{
        base4.push(item)
      })
      res.json(base4);
    })
});

app.get('/hello5', (req, res) => {
  base5=[]
  connection.query("SELECT * FROM startpage", function(err, baseresults) {
      baseresults.forEach((item)=>{
        if (item.opts.length>0)
        {item.opts=JSON.parse(item.opts)}
        else {item.opts=[]}
        base5.push(item)
      })
      res.json(base5);
    })
});

app.get('/hello6', (req, res) => {
  base6=[]
  connection.query("SELECT * FROM offertextstart", function(err, baseresults) {
      baseresults.forEach((item)=>{

        base6.push(item)
      })
      res.json(base6);
    })
});

app.get('/hello7', (req, res) => {
  base7=[]
  connection.query("SELECT * FROM offertextend", function(err, baseresults) {
      baseresults.forEach((item)=>{
        if (item.opts.length>0)
        {item.opts=JSON.parse(item.opts)}
        else {item.opts=[]}
        base7.push(item)
      })
      res.json(base7);
    })
});

app.get('/topnull', (req, res) => {
  basetopnull=[]
  connection.query("SELECT * FROM offers WHERE top='Да, под 0'", function(err, baseresults) {
      baseresults.forEach((item)=>{
        basetopnull.push(item)
      })
      res.json(basetopnull);
    })
});

app.get('/topstandart', (req, res) => {
  basetopstandart=[]
  connection.query("SELECT * FROM offers WHERE top='Да, под обычный процент'", function(err, baseresults) {
      baseresults.forEach((item)=>{
        basetopstandart.push(item)
      })
      res.json(basetopstandart);
    })
});

app.get('/topbad', (req, res) => {
  basetopbad=[]
  connection.query("SELECT * FROM offers WHERE top='Да, с плохой кредитной историей'", function(err, baseresults) {
      baseresults.forEach((item)=>{
        basetopbad.push(item)
      })
      res.json(basetopbad);
    })
});



app.get('/geo', (req, res) => {
  geo=[]
  connection.query("SELECT NAME AS geo,-1 AS active FROM regions", function(err, baseresults) {
      baseresults.forEach((item)=>{
        geo.push(item)
      })
      res.json(geo);
    })
});


let bodyParser = require('body-parser');
const e = require('express');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/formvalues', (req, res) => {
  if (req.body.id){
    connection.query("UPDATE questions SET question = '"+req.body.question+"',anketaopts = '"+req.body.anketaopts+"',TYPE = '"+req.body.type+"',ERROR = '"+req.body.error+"',question_small = '"+req.body.question_small+"' WHERE id='"+req.body.id+"'", function(err, data) {
      res.send("ok")
  })
  }
  else {
connection.query("INSERT INTO questions(question,anketaopts,TYPE,ERROR,question_small) VALUE ('"+req.body.question+"','"+req.body.anketaopts+"','"+req.body.type+"','"+req.body.error+"','"+req.body.question_small+"')", function(err, data) {
    res.send("ok")
})
}
});

app.post('/startpageformvalues', (req, res) => {
  if (req.body.id){
    connection.query("UPDATE startpage SET msg = '"+req.body.msg+"',opts = '"+req.body.opts+"' WHERE id='"+req.body.id+"'", function(err, data) {
      res.send("ok")
  })
  }
});

app.post('/offertextstart', (req, res) => {
  if (req.body.id){
    connection.query("UPDATE offertextstart SET msg = '"+req.body.msg+"' WHERE id='"+req.body.id+"'", function(err, data) {
      res.send("ok")
  })
  }
});

app.post('/offertextend', (req, res) => {
  if (req.body.id){
    connection.query("UPDATE offertextend SET msg = '"+req.body.msg+"',opts = '"+req.body.opts+"' WHERE id='"+req.body.id+"'", function(err, data) {
      res.send("ok")
  })
  }
});

  app.post('/formvalues2', (req, res) => {
    if (req.body.id){
      connection.query("UPDATE selection SET question = '"+req.body.question+"',anketaopts = '"+req.body.anketaopts+"',TYPE = '"+req.body.type+"',ERROR = '"+req.body.error+"',question_small = '"+req.body.question_small+"' WHERE id='"+req.body.id+"'", function(err, data) {
        res.send("ok")
    })
    }
    else {
  connection.query("INSERT INTO selection(question,anketaopts,TYPE,ERROR,question_small) VALUE ('"+req.body.question+"','"+req.body.anketaopts+"','"+req.body.type+"','"+req.body.error+"','"+req.body.question_small+"')", function(err, data) {
      res.send("ok")
  })
  }
  });



    app.post('/formvalues3', (req, res) => {
      if (req.body.id){
        connection.query("UPDATE offers SET name = '"+req.body.name+"',description = '"+req.body.description+"',link = '"+req.body.link+"',top = '"+req.body.top+"',jsonopts = '"+req.body.jsonopts+"' WHERE id='"+req.body.id+"'", function(err, data) {
          res.send("ok")
      })
      }
      else {
    connection.query("INSERT INTO offers(name,description,link,top,jsonopts) VALUE ('"+req.body.name+"','"+req.body.description+"','"+req.body.link+"',top = '"+req.body.top+"','"+req.body.jsonopts+"')", function(err, data) {
        res.send("ok")
    })
    }
    });



app.post('/deleteform', (req, res) => { 
    connection.query("DELETE FROM questions WHERE id='"+req.body.row+"'", function(err, data) {
        res.send("ok")
    })
    });

app.post('/deleteform2', (req, res) => { 
    connection.query("DELETE FROM selection WHERE id='"+req.body.row+"'", function(err, data) {
        res.send("ok")
      }) 
      });

app.post('/deleteform3', (req, res) => { 
    connection.query("DELETE FROM offers WHERE id='"+req.body.row+"'", function(err, data) {
        res.send("ok")
      }) 
      });

app.post('/deleteform4', (req, res) => { 
    connection.query("DELETE FROM clients WHERE id='"+req.body.row+"'", function(err, data) {
        res.send("ok")
      }) 
      });






app.listen(3000, () => {
console.log("app_listen 3000")
});
