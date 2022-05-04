const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const cors = require("cors")
app.use(cors())
const PORT = process.env.PORT || 3001;

const con = mysql.createConnection({
  host: "washington.uww.edu",
  user: 'hoganct11',
  password: 'ch7463',
  database: "manga_rec"
});

con.connect(function(err) {
   if (err) throw err;
   console.log('connected');
});

app.get('/api/manga/', function(req, res) {
  let sql = 'select * from manga'
  con.query(sql,req.params.id,function (err,result) {
      if (err) throw err;
      console.log(result);
      res.send(JSON.stringify(result));
  });
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
});

app.get('/api/manga/:id', function(req, res) {
  let sql = 'select * from manga where id = ?'
  con.query(sql,req.params.id,function (err,result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
});

app.get('/api/genre/:genre', function(req, res) {
  let sql = 'select * from manga where genre like ? order by rand() limit 10'
  let genre = '%'+req.params.genre+'%'
  con.query(sql, genre,function (err,result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
});

app.get('/api/theme/:theme', function(req, res) {
  let sql = 'select * from manga where theme like ? order by rand() limit 10'
  let theme = '%'+req.params.theme+'%'
  con.query(sql, theme, function (err,result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
});

  app.listen(PORT, () => 
    console.log(`Server listening on ${PORT}`)
  );
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
