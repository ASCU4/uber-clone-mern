const http = require('http');
const app = require('./app');
const connectToDatabase = require('./db/db');

const port = process.env.PORT || 3000;
connectToDatabase(); 

const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
}); 