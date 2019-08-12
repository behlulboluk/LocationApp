import express from 'express';
import bodyParser from 'body-parser';
import dbConfig from './config/database.config';
import mongoose from 'mongoose';
import routes from './app/routes/Location.route';
import cors from 'cors';
// create express app
let app = express();
//let note = require('./app/routes/routes');
let port = 8000
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cors())
app.use('/api', routes);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Location Project',
      });
});

//app routes
// app.route("/note")
//     .get(note.getNote)
//     .post(note.postNote);
// app.route("/note/:noteId")
//     .get(note.getNotes)
//     .delete(note.deleteNote)
//     .put(note.updateNote);

// require('./app/routes/note.route')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Our server is running on port ${port} - http://localhost:${port}/`);
});

export default app;