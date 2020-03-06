const express = require('express');
const app = express();
app.use(express.json());

var mysql = require('mysql');
// const connection= mysql.createConnection({
// 	host: 'mysql',
// 	user: 'exampleuser',
// 	password: 'password' });
// 	app.get('/', (req, res) => {
// 	res.send('HELLO WORLD!');
// 	console.log('here')
// });


app.get('/', (req, res) => {
	res.send('hi WORLD!')
})

//Connect to MySQL
var con = mysql.createConnection({
  host: "docker_thing_mysql_1",
  port: "3306",
  user: "exampleuser",
  password: "password",
  database: "example"
});

//Open Connection
con.connect(function(err) {
	  if (err) throw err;
});

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});



//GET
// /api/getit
router.get('/getit', function (req, res) {
	con.query("SELECT * FROM t1", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST---------------------------- these won't work until fixed
// /api/postit
// if something fucks up, just comment out all of the code below
router.post('/postit', async (req, res) => {
	var id = req.param('id');
	var id2 = req.param('id2');
	con.query("INSERT INTO t1 VALUES (?,?);", [id,id2],function (err, result, fields) { // figure this bullshit out.
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// // PUT 
// // /api/putit change to work
// router.put('/putit', async (req, res) => {
//   var id = req.param('id');
  
// 	con.query("UPDATE t1 SET f1 = 3 WHERE f1 = ? ", id,function (err, result, fields) {
// 		if (err) throw err;
// 		//console.log(result);
// 		res.end(JSON.stringify(result)); 
// 	});
// });

// DELETE
// /api/deleteit
router.delete('/deleteit', async (req, res) => {
  var id = req.param('id');
  
	con.query("DELETE FROM t1 WHERE column1 = 5", id,function (err, result, fields) {
		if (err) 
			return console.error(error.message);
		res.end(JSON.stringify(result)); 
	  });
});//-------------------------------------------------------------------

// REGISTER  ROUTES
app.use('/api', router);

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));