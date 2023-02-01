const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const rootRoute = require('./routes/rootRoute');
const config = require('./config/index');
const conn = mysql.createConnection({
	host: config.dbHost,
	user: config.dbUser,
	password: config.dbPass,
	port: config.dbPort,
	database: config.dbDatatbase,
});

app.use(express.json());
app.use(express.static('.'));
app.use(cors());
app.listen(config.port, () => {
	console.log(`Server running at ${config.port}...`);
});
app.use('/api', rootRoute);
