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


app.get('/api/:user/manga/:id', function(req, res) {
  let sql = 'select * from ratings where userId = ? and mangaId = ?;'
  con.query(sql, [req.params.user, req.params.id], function (err,result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });
  // res.send("id is set to " + req.params.id);
// console.log("Request for manga id: " + req.params.id);
});

app.post('/api/:userId/manga/:mangaId/:interest', function(req,res) {
  // const sql = 'call Interest(' + InterestStatus + ',' + 'mangaId' + ',' + 'userId' + ')';
  console.log("User: " + req.params.userId + " is " + req.params.interest + " in manga with id " + req.params.mangaId);
  con.query('CALL Interest(?,?,?)',
      [
          req.params.interest,
          req.params.mangaId,
          req.params.userId
      ], function (err,result,field) {
      if (err) throw err;
      res.send(JSON.stringify(result));
  });
});

app.post('/api/:userId/:mangaId/:rating', function(req,res) {
  // const sql = 'call Interest(' + InterestStatus + ',' + 'mangaId' + ',' + 'userId' + ')';
  console.log("User: " + req.params.userId + " is " + req.params.rating+ " in manga with id " + req.params.mangaId);
  con.query('CALL AddRating(?,?,?)',
      [
          req.params.mangaId,
          req.params.userId,
          req.params.rating
      ], function (err,result,field) {
      if (err) throw err;
      res.send(JSON.stringify(result));
  });
});

app.get('/api/interest/:user', function(req, res) {
  let sql = 'select manga.* from manga inner join ratings on manga.id = ratings.mangaid where ratings.status = "interested" and ratings.userID = ? order by rand() limit 10'
  con.query(sql, req.params.user, function (err,result) {
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
