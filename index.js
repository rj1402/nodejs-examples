const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Send all dishes');
});

app.post('/dishes', (req, res, next) => {
    res.end('will add the dish: '+ req.body.name + ' with details : ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
});

app.delete('/dishes', (req, res, next) => {
    res.end('delete user operation');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Send all dishes' + req.params.dishId);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported ' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write(' updatteing the dish'  + req.params.dishId + '\n');
    res.end('will update the dish : '+ req.body.name + ' with details ' + req.body.description)
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('delete dish operation ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Contenr-Type','text/html');
    res.end('<html><body><h1>this is an express server!!</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server runnning at http://${hostname}:${port}`);
});